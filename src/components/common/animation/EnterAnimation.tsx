import { HTMLMotionProps, motion } from 'motion/react';
import { ReactNode } from 'react';

export interface EnterAnimationProps
  extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'transition'> {
  children: ReactNode;
}

export default function EnterAnimation({ children, ...props }: EnterAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        scale: { type: 'spring', visualDuration: 0.25, bounce: 0.2 },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
