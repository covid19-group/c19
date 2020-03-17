import { AnimatePresence, motion } from 'framer-motion';

export default ({ size, className, color }) => (
  <motion.svg
    className={className}
    height={size}
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 24 24"
    viewBox="0 0 24 24"
    style={{ overflow: 'visible', margin: '0 auto' }}>
    <motion.path
      initial={false}
      animate={{
        pathLength: [0.125, 0.25, 0.5, 0.25, 0.125],
        rotate: ['90deg', '45deg', '0deg', '-180deg', '-270deg'],
      }}
      transition={{
        loop: Infinity,
        type: 'spring',
        duration: 0.9,
      }}
      style={{ scaleX: '-1', originX: '50%', originY: '50%', originZ: 0 }}
      fill="transparent"
      stroke={color === 'white' ? '#FFFFFF' : '#38B2AC'}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1,12a11,11 0 1,0 22,0a11,11 0 1,0 -22,0"
    />
  </motion.svg>
);
