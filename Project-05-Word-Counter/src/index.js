#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
function countWordsAndCharacters(input) {
    const words = input.split(/\s+/).filter((word) => word !== "");
    const characters = input.replace(/\s/g, "").length;
    return {
        words: words.length,
        characters: characters,
    };
}
function main() {
    const userInput = readline_sync_1.default.question("Enter an English paragraph: ");
    const result = countWordsAndCharacters(userInput);
    console.log(`Number of words (excluding whitespaces): ${result.words}`);
    console.log(`Number of characters (excluding whitespaces): ${result.characters}`);
}
main();
