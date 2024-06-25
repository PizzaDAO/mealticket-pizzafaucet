import Image from "next/image";
import { ChannelCasts } from "./components/ChannelCasts";
import { ConnectWalletButton } from "./components/ConnectWalletButton";
import { ReimbursmentButton } from "./components/ReimbursmentButton";
import Logo from "./logo.svg";

export default function Home() {
  return (
    <>
      <div className="w-full bg-yellow-300">
        <nav className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-2 lg:px-6">
          <Image src={Logo} alt="Pizza Faucet" className="size-12" />
          <div className="flex items-center space-x-2.5">
            <ReimbursmentButton />
            <ConnectWalletButton />
          </div>
        </nav>
      </div>
      <header className="relative bg-yellow-300 pb-24 pt-12">
        <h2 className="text-center font-display text-5xl font-bold sm:text-7xl">
          Pizza <span className="text-red-500">Faucet</span>
        </h2>
        <p className="mx-auto mt-2.5 max-w-2xl text-center font-display text-xl font-light text-yellow-950">
          A Free and Open faucet design to bring pizza to the people.
        </p>
        <div className="absolute inset-x-0 bottom-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="h-12 w-full rotate-180 md:h-20"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-yellow-50"
            />
          </svg>
        </div>
      </header>
      <ChannelCasts channelId="pizzafaucet" />
      <footer className="jrelative bg-yellow-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="h-20 w-full"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-yellow-50"
          ></path>
        </svg>
        <div className="pb-10">
          <p className="text-center font-display text-yellow-950">
            Copyleft
            <span className="mx-1 inline-block scale-x-[-1] transform">&copy;</span>
            PizzaDAO 2024
          </p>
        </div>
      </footer>
    </>
  );
}
