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
    <div className="container py-20">
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="text-xl font-bold">{errorTitle}</AlertTitle>
        <AlertDescription className="mt-2">{errorMessage}</AlertDescription>
        <Button asChild className="mt-4">
          <Link to={ROUTES.HOME}>Go to Home</Link>
        </Button>
      </Alert>
    </div>
  )
}

