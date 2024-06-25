"use client";

import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { getAddress } from "viem";
import { useReimbursement } from "../libs/ReimbursementProvider";
import { TransactionStatus } from "./TransactionStatus";
import { useAccount } from "wagmi";

export function ReimbursmentModal() {
  const { closeModal, isModalOpen, reimburse, cast, reset, isConfirmed, isConfirming, isPending } =
    useReimbursement();
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    reset();
    setAmount("");
    setAddress("");
    if (cast) setAddress(cast.author.verified_addresses.eth_addresses?.[0] || "");
  }, [cast, reset]);

  return (
    <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/75 backdrop-blur" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-xl border bg-yellow-50 p-8 font-sans">
          <DialogTitle className="font-display text-2xl font-bold">
            Reimburse <span className="text-red-500">expense</span>
          </DialogTitle>
          <Description className="text-sm">
            Enter the amount you would like to send to{" "}
            <span className="font-display font-medium">
              {cast?.author.display_name || cast?.author.username}.
            </span>
          </Description>
          <form
            onSubmit={e => {
              e.preventDefault();
              reimburse(amount, getAddress(address));
            }}
            className="mt-6 space-y-4"
          >
            <Field>
              <Label className="block text-sm font-medium text-gray-900">ETH Address</Label>
              <div className="mt-1 rounded-md shadow-sm">
                <Input
                  name="address"
                  type="text"
                  value={address}
                  maxLength={42}
                  onChange={e => setAddress(e.target.value)}
                  required
                  autoComplete="off"
                  className="block w-full rounded-md border-0 bg-transparent px-3 py-3 text-gray-900 outline-none ring-1 ring-inset ring-black [appearance:textfield] focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm"
                />
              </div>
            </Field>

            <Field className="max-w-40">
              <Label className="block text-sm font-medium text-gray-900">Amount</Label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <Input
                  name="amount"
                  autoFocus
                  type="number"
                  min={1}
                  max={1500}
                  step={1}
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  autoComplete="off"
                  required
                  className="block w-full rounded-md border-0 bg-transparent py-3 pl-3 pr-20 text-gray-900 outline-none ring-1 ring-inset ring-black [appearance:textfield] focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-black/60 sm:text-sm" id="price-currency">
                    USDC
                  </span>
                </div>
              </div>
            </Field>

            <div className="mt-6 flex items-center justify-between gap-6">
              <div className="text-sm">
                <TransactionStatus />
              </div>
              <div className="flex items-center gap-6">
                <button
                  onClick={closeModal}
                  type="button"
                  className="duration-100 ease-in-out hover:text-red-500 sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    Number(amount) <= 0 ||
                    !isEthAddress(address) ||
                    isPending ||
                    isConfirming ||
                    isConfirmed
                  }
                  className="rounded-xl bg-red-500 px-4 pb-1.5 pt-2.5 font-display font-medium text-white duration-100 ease-in-out hover:bg-red-400 disabled:opacity-50"
                >
                  Proceed
                </button>
              </div>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function isEthAddress(text?: string | null): boolean {
  return /^(0x){1}[0-9a-fA-F]{40}$/i.test(text || "");
}
