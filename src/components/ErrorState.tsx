import { motion } from 'framer-motion';
import { AlertCircle, SearchX, Heart, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';

// Error State 
interface ErrorStateProps {
  message?: string
  onRetry?: () => void
  className?: string
}
 
export function ErrorState({ message = 'Something went wrong.', onRetry, className }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex flex-col items-center justify-center py-16 text-center gap-4', className)}
    >
      <AlertCircle size={48} className="text-[var(--color-brand-red)] opacity-60" />
      <div>
        <p className="font-semibold text-[var(--color-gray-white)]">{message}</p>
        <p className="text-[var(--color-gray-400)] text-sm mt-1">Please try again later.</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} size="default" className="mt-2 gap-2">
          <RefreshCw size={14} /> Try Again
        </Button>
      )}
    </motion.div>
  )
}
 
// Search Empty 
export function SearchEmpty({ query, className }: { query: string; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex flex-col items-center justify-center py-20 text-center gap-4', className)}
    >
      <SearchX size={56} className="text-[var(--color-gray-700)]" />
      <div>
        <p className="font-semibold text-lg text-[var(--color-gray-white)]">
          No results for "{query}"
        </p>
        <p className="text-[var(--color-gray-400)] text-sm mt-1.5">
          Try different keywords or check your spelling.
        </p>
      </div>
    </motion.div>
  )
}
 
// Favorites Empty
export function FavoritesEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center gap-5"
    >
      <div
        className="w-24 h-24 rounded-[var(--radius-full)] flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <Heart size={40} className="text-[var(--color-gray-700)]" />
      </div>
      <div>
        <p className="font-semibold text-xl text-[var(--color-gray-white)]">No Favorites Yet</p>
        <p className="text-[var(--color-gray-400)] text-sm mt-2">
          Movies you heart will appear here.
        </p>
      </div>
      <Link to="/">
        <Button size="lg" className="mt-2">Browse Movies</Button>
      </Link>
    </motion.div>
  )
}
 
// Loading Spinner 
export function LoadingSpinner({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          width:        size,
          height:       size,
          borderRadius: '50%',
          border:       '2px solid rgba(255,255,255,0.1)',
          borderTopColor: 'var(--color-brand-red)',
        }}
      />
    </div>
  )
}