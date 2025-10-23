import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The application encountered an unexpected error. This might be due to missing configuration.
              </p>

              {/* Error Details */}
              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-6 text-left overflow-auto max-h-64">
                <p className="text-sm font-mono text-red-600 dark:text-red-400 mb-2">
                  {this.state.error && this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="text-xs text-gray-600 dark:text-gray-400">
                    <summary className="cursor-pointer hover:text-gray-800 dark:hover:text-gray-200">
                      Stack trace
                    </summary>
                    <pre className="mt-2 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>

              {/* Helpful Tips */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  Common fixes:
                </h3>
                <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1 list-disc list-inside">
                  <li>Make sure you have a <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">.env</code> file with Firebase credentials</li>
                  <li>Check that all environment variables are correctly set</li>
                  <li>Try clearing your browser cache and localStorage</li>
                  <li>Check the browser console for more details</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Reload Page
                </button>
                <button
                  onClick={() => {
                    localStorage.clear()
                    window.location.reload()
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Clear Data & Reload
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
