import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { ROUTES } from '@/routes'

export default function ErrorPage() {
  const error = useRouteError()

  let errorMessage = 'An unexpected error occurred'
  let errorTitle = 'Something went wrong'

  if (isRouteErrorResponse(error)) {
    errorTitle = `Error ${error.status}`
    errorMessage = error.statusText || error.data?.message || errorMessage
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  return (
    <div className="container py-12 sm:py-16 md:py-20 bg-black px-3 sm:px-4">
      <Alert variant="destructive" className="max-w-2xl mx-auto bg-black/50 border-white/10">
        <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
        <AlertTitle className="text-lg sm:text-xl font-bold text-white">{errorTitle}</AlertTitle>
        <AlertDescription className="mt-2 text-sm sm:text-base text-gray-300">{errorMessage}</AlertDescription>
        <Button asChild className="mt-4 text-sm sm:text-base h-10 sm:h-11 touch-manipulation">
          <Link to={ROUTES.HOME}>Go to Home</Link>
        </Button>
      </Alert>
    </div>
  )
}

