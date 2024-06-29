import { FC, useState, useMemo, useCallback, useEffect } from "react";

// icons imports
import { IconMessage } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";

// other imports
import { useInfiniteQuery } from "@tanstack/react-query";

// local imports
import { Loading } from "@/components";
import { Some, getElementMaybe, infiniteScroll } from "@/helpers";
import { usePlant, useResponsive } from "@/hooks";
import HeartButton from "@/pages/Home/Feed/HeartButton";
import { FeedTendril } from "@/pages/Home/types";
import { CommentService } from "@/services";
import { toComment } from "../helpers";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const CommentSection: FC<{ tendril: FeedTendril }> = ({ tendril }) => {
  const plant = usePlant();
  const R = useResponsive();
  const [isCommenting, setIsCommenting] = useState(false);

  async function fetchComments({ pageParam = 0 }: { pageParam: number }) {
    const resp = await CommentService.getAll({
      uuid: tendril.uuid,
      page: pageParam,
    });
    const data = Some.Object(resp?.data?.data);
    const hasNextPage =
      pageParam * CommentService.TAKE + Some.Number(data.pageTotal) <=
      Some.Number(data.total);
    return {
      data: Some.Array(data?.data).map(toComment),
      nextCursor: hasNextPage ? pageParam + 1 : undefined,
    };
  }

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["getComments", tendril.uuid],
      queryFn: fetchComments,
      refetchOnWindowFocus: false,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const comments = useMemo(
    () => (data ? data.pages.flatMap((page) => page.data) : []),
    [data]
  );

  function onClick() {
    setIsCommenting(true);
    setTimeout(() => {
      getElementMaybe("comment-box").run((el) =>
        el.scrollIntoView({ behavior: "smooth" })
      );
    }, 100);
  }
  const onScroll = useCallback(
    (e: Event) =>
      infiniteScroll(fetchNextPage)({ currentTarget: e.currentTarget! }),
    [fetchNextPage]
  );

  useEffect(() => {
    const container = document.getElementById("tendril-container");
    container?.addEventListener("scroll", onScroll);
    return () => container?.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <div
      id="tendril-comments"
      className="py-8 border-t border-t-base-content/30 flex flex-col"
    >
      <div className="flex gap-2 md:gap-4 mt-2 2xl:mt-4">
        <HeartButton curls={tendril.curls} uuid={tendril.uuid} />
        <div className="flex gap-1 md:gap-2 items-center [&>*]:text-base-content">
          <IconMessage size={R({ base: 24, lg: 28, "2xl": 32 })} />
          <p className="text-sm md:text-md 2xl:text-lg font-medium">
            {comments.length || tendril.commentsCount}
          </p>
        </div>
        {plant.Render(() => (
          <button className="btn btn-ghost" onClick={onClick}>
            <IconPlus size={R({ base: 22, lg: 26, "2xl": 30 })} />
            Add comment
          </button>
        ))}
      </div>
      <CommentForm
        show={isCommenting}
        uuid={tendril.uuid}
        onCancel={() => setIsCommenting(false)}
        afterSuccess={() => setIsCommenting(false)}
      />
      <Loading
        div
        on={isLoading}
        className="flex flex-col gap-2 md:gap-4 mt-4 2xl:mt-8"
      >
        <p className="text-md 2xl:text-lg text-80">Comments</p>
        {comments.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
        {comments.length === 0 && (
          <p className="text-lg 2xl:text-2xl text-80 text-center pb-8 2xl:pb-12">
            No comments
          </p>
        )}
        <Loading div on={isFetchingNextPage} className="center" />
      </Loading>
    </div>
  );
};

export default CommentSection;
