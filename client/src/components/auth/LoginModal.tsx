import { useState } from 'react'
import { Phone, ArrowLeft, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendOtp = async () => {
    if (!phoneNumber.trim() || phoneNumber.length < 10) {
      return
    }
    
    setIsLoading(true)
    // TODO: Integrate with Supabase to send OTP
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStep('otp')
    }, 1000)
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendOtp()
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp.trim() || otp.length !== 6) {
      return
    }
    
    setIsLoading(true)
    // TODO: Integrate with Supabase to verify OTP
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // TODO: Handle successful login
      onOpenChange(false)
      // Reset form
      setStep('phone')
      setPhoneNumber('')
      setOtp('')
    }, 1000)
  }

  const handleBack = () => {
    setStep('phone')
    setOtp('')
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset form when closing
      setStep('phone')
      setPhoneNumber('')
      setOtp('')
    }
    onOpenChange(open)
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    // Limit to 10 digits
    const limited = digits.slice(0, 10)
    return limited
  }

  const formatOtp = (value: string) => {
    // Remove all non-digits and limit to 6 digits
    const digits = value.replace(/\D/g, '').slice(0, 6)
    return digits
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-md bg-black border-white/10 p-0 gap-0 sm:p-6">
        <DialogHeader className="px-4 pt-6 pb-4 sm:px-0 sm:pt-0">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
            {step === 'phone' ? 'Login / Sign Up' : 'Enter OTP'}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-gray-400 text-center sm:text-left mt-2">
            {step === 'phone' ? (
              'Enter your phone number to continue. We\'ll send you a verification code.'
            ) : (
              <>
                We've sent a 6-digit code to{' '}
                <span className="font-medium text-white">{phoneNumber}</span>. Please enter it below.
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <Separator className="bg-white/10" />

        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4 sm:space-y-5 p-4 sm:p-0 sm:pt-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm sm:text-base text-white">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 z-10 pointer-events-none" />
                <Input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                  className="pl-10 sm:pl-11 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-white/20 h-11 sm:h-12 text-base sm:text-lg touch-manipulation"
                  required
                  maxLength={10}
                  disabled={isLoading}
                  autoFocus
                />
              </div>
              <p className="text-xs sm:text-sm text-gray-500">
                Enter your 10-digit mobile number
              </p>
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-white text-black hover:bg-gray-100 active:bg-gray-200 font-semibold touch-manipulation min-h-[44px] sm:min-h-[48px]"
              disabled={isLoading || phoneNumber.length < 10}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  <span className="text-sm sm:text-base">Sending OTP...</span>
                </>
              ) : (
                <span className="text-sm sm:text-base">Continue</span>
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4 sm:space-y-5 p-4 sm:p-0 sm:pt-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm sm:text-base text-white">
                Verification Code
              </Label>
              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(formatOtp(e.target.value))}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-white/20 h-14 sm:h-16 text-center text-3xl sm:text-4xl tracking-[0.5em] font-mono touch-manipulation"
                required
                maxLength={6}
                disabled={isLoading}
                autoFocus
              />
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 pt-1">
                <p className="text-xs sm:text-sm text-gray-500 text-center">
                  Didn't receive the code?
                </p>
                <Button
                  type="button"
                  variant="link"
                  onClick={sendOtp}
                  className="h-auto p-0 text-xs sm:text-sm text-white underline hover:text-gray-300 active:text-gray-400 touch-manipulation min-h-[44px] sm:min-h-0"
                  disabled={isLoading}
                >
                  Resend
                </Button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-3">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleBack}
                className="w-full sm:flex-1 border-white/10 text-white hover:bg-white/10 active:bg-white/20 touch-manipulation min-h-[44px] sm:min-h-[48px]"
                disabled={isLoading}
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">Back</span>
              </Button>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:flex-1 bg-white text-black hover:bg-gray-100 active:bg-gray-200 font-semibold touch-manipulation min-h-[44px] sm:min-h-[48px]"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    <span className="text-sm sm:text-base">Verifying...</span>
                  </>
                ) : (
                  <span className="text-sm sm:text-base">Verify</span>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

