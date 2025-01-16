import { Home, RefreshCw } from 'lucide-react';

const ErrorPage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-serif text-gray-900 mb-3">
          Oh no!
        </h1>
        
        <p className="text-xl font-light text-gray-700 mb-2">
          Something went wrong
        </p>
        
        <p className="text-gray-600 mb-8">
          We're temporarily unable to show you what you're looking for. 
          Please try refreshing the page or explore our latest collection.
        </p>
        
        <div className="space-y-4 max-w-xs mx-auto">
          <button
            onClick={handleRefresh}
            className="w-full bg-black text-white px-6 py-3 rounded-none hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          
          <a
            href="/"
            className="w-full block border border-black px-6 py-3 text-black hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Return to Homepage
          </a>
          
          <p className="text-sm text-gray-500 mt-6">
            Need assistance? Contact our customer service
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;