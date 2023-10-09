"use client";

import { useBoardStore } from "@/store/BoardStore";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React from "react";

const Header = () => {
    const [searchString, setSearchString] = useBoardStore((state) => {
        return [state.searchString, state.setSearchString];
    });

    return (
        <header className="w-full px-5 py-3 flex flex-col md:flex-row justify-between items-center">
            <Image
                src={"/trello-icon.png"}
                width={200}
                height={30}
                alt="App Logo"
                className="w-44 md:w-56 pb-5 md:p-0"
            />
            <form
                action=""
                className="bg-gray-100 flex justify-center items-center space-x-5 rounded-xl p-2 shadow-md w-full md:w-4/12 mr-0 md:mr-5"
            >
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full outline-none bg-transparent"
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                />
                <button hidden type="submit">
                    Search
                </button>
            </form>
        </header>
    );
};

export default Header;
