"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { IconSunLow, IconMoonStars } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <button
        onClick={() => {
          theme === "dark" ? setTheme("light") : setTheme("dark");
        }}
        className="w-10 h-10 flex hover:bg-gray-50 dark:hover:bg-white/[0.1] rounded-lg items-center justify-center outline-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none overflow-hidden"
      >
        {theme === "light" && (
          <motion.div
            key={theme}
            initial={{
              x: 40,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <IconSunLow className="h-5 w-5 flex-shrink-0  " />
          </motion.div>
        )}

        {theme === "dark" && (
          <motion.div
            key={theme}
            initial={{
              x: 40,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              ease: "easeOut",
              duration: 0.3,
            }}
          >
              <IconMoonStars className="h-5 w-5 dark:text-white flex-shrink-0" />
          </motion.div>
        )}

        <span className="sr-only">Toggle theme</span>
      </button>
    )
  );
}
