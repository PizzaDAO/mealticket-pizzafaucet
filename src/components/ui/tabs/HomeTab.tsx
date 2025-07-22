"use client";

/**
 * HomeTab component displays the main landing content for the mini app.
 * 
 * This is the default tab that users see when they first open the mini app.
 * It provides a simple welcome message and placeholder content that can be
 * customized for specific use cases.
 * 
 * @example
 * ```tsx
 * <HomeTab />
 * ```
 */
export function HomeTab() {
  return (
    <div className="flex justify-center h-[calc(100vh-200px)] px-6">
      <div className="text-center w-full max-w-md mx-auto">
         <div className="lg:sticky lg:top-[136px]">
          <h2 className="flex gap-2 font-display text-5xl font-bold sm:text-[82px]">
              Pizza <span className="text-red-500 inline-block"> Faucet</span>
          </h2>
          <p className="mb-12 text-right text-xl font-medium text-yellow-950 lg:text-3xl">
              A Free and Open faucet designed to bring pizza to the people.
          </p>
        </div>
      </div>
    </div>
  );
} 