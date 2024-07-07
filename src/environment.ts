type EnvName = "prod" | "local";
type Environment = {
  name: EnvName;
  apiUrl: string;
};

function getEnvironment(): Environment {
  if (window.location.href.includes("localhost"))
    return { name: "local", apiUrl: "http://localhost:8000/" };
  return { name: "prod", apiUrl: "http://localhost:8000/" };
}

const environment = getEnvironment();

export default environment;
