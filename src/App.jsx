import { CardContent } from "./components/card-content";
import useFetch from "./hooks/use-fetch";
import PageLayout from "./layouts/page-layout";
import Container from "./components/container";
import { Helmet } from "react-helmet";

function App() {
  const BASE_API_URL = "https://api.github.com/";
  const { data, error, isLoading } = useFetch(`${BASE_API_URL}users`);

  if (isLoading) {
    return (
      <PageLayout>
        <Container
          className={`mx-auto flex justify-center items-center my-10 `}
        >
          <div className="flex justify-center items-center">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
              role="status"
            ></div>
          </div>
        </Container>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <Container className={`mx-auto flex justify-center items-center my-10`}>
          <h1 className="text-3xl text-gray-700 font-bold transition ease-in-out delay-150">
            Error ...
          </h1>
        </Container>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Github Users</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Container className={`my-5`}>
        <h1 className="text-gray-600 text-3xl">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {(data || []).map((item) => (
              <CardContent
                key={item.id}
                isLoading={isLoading}
                name={item.login}
                description={item.type}
                link={item.html_url}
                cta={`Github`}
                foregroundColor="gray-200"
                image={item.avatar_url}
              />
            ))}
          </ul>
        </h1>
      </Container>
    </PageLayout>
  );
}

export default App;
