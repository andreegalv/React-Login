import { MouseEventHandler } from "react";

export type ButtonOnClickType = MouseEventHandler<HTMLButtonElement>;
export type ButtonVariants = "text" | "outlined" | "contained";
export type ButtonColors = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
export type TypeButtons = "button" | "reset" | "submit";