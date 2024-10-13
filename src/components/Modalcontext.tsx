"use client"; // Ensure this is client-side because it uses useState

import React, { createContext, useContext, useState } from "react";

// Define the type for the context
interface ModalcontextType {
    isShown: boolean;
    setIsShown: (loading: boolean) => void;
    message: string;
    setMessage: (message: string) => void;
    icon: string;
    setIcon: (message: string) => void;
}

// Create the context with default values
const ModalContext = createContext<ModalcontextType>({
    isShown: false, // Default state
    setIsShown: () => {}, // Default function
    message: "", // Default message
    setMessage: () => {},
    icon: "", // Default message
    setIcon: () => {},
});

// Hook to use the Loader context
export const useModal = () => {
    return useContext(ModalContext);
};

// ModalProvider component to wrap your app
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isShown, setIsShown] = useState(false);
    const [message, setMessage] = useState("");
    const [icon, setIcon] = useState("");

    return (
        <ModalContext.Provider
            value={{ isShown, setIsShown, message, setMessage, icon, setIcon }}
        >
            {children}
        </ModalContext.Provider>
    );
};
