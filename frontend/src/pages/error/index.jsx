import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Oops!
        </h1>
        <h3 className="mt-4 text-xl font-semibold tracking-tight text-gray-900 sm:text-xl">
          Sorry, an unexpected error has occured.
        </h3>
        <div className="mt-6 flex flex-nowrap justify-center items-center gap-3">
          <p className="text-base font-semibold text-indigo-600">
            {error.status}
          </p>
          <p className="text-base italic leading-7 text-gray-600">
            {error.statusText}
          </p>
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ErrorPage;
