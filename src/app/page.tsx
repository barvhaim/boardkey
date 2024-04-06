"use client";

import styles from "./page.module.scss";
import {useEffect, useState} from "react";


const hebrewLetters = [
    'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ך', 'ל', 'מ', 'ם',
    'נ', 'ן', 'ס', 'ע', 'פ', 'ף', 'צ', 'ץ', 'ק', 'ר', 'ש', 'ת'
];

const delay = 1000;

export default function Home() {
    const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<any>(null);
    const [currentWord, setCurrentWord] = useState<string>("");
    const [currentWords, setCurrentWords] = useState<string[]>([]);
    const [isButtonsAvailable, setIsButtonsAvailable] = useState<boolean>(true);

    const handleLetterSelect = () => {
        console.log('current interval', intervalId);
        setIsButtonsAvailable(false);
        clearInterval(intervalId);
        setCurrentLetterIndex(0);
        setCurrentWord(prevState => prevState.concat(hebrewLetters[currentLetterIndex]));

        setTimeout(() => {
            const id = setInterval(() => {
                setCurrentLetterIndex(prevState => (prevState + 1) % hebrewLetters.length);
            }, delay);
            console.log('new interval id', id);
            setIntervalId(id);
            setIsButtonsAvailable(true);
        }, 500);
    }

    const handleLetterRemove = () => {
        setCurrentWord(prevState => prevState.slice(0, -1));
    }

    const handleWordSelect = () => {
        setCurrentWords(prevState => [...prevState, currentWord]);
        setCurrentWord("");
    }

    useEffect(() => {
        console.log('init!');
        const id = setInterval(() => {
            setCurrentLetterIndex(prevState => (prevState + 1) % hebrewLetters.length);
        }, delay);
        console.log(id);
        setIntervalId(id);

        return () => {
            console.log('clearing');
            clearInterval(id);
        };
    }, []);


    return (
        <div className={styles.container}>
            <div className={styles.current_letter_box}>
                {hebrewLetters[currentLetterIndex]}
            </div>

            <div className={styles.action_buttons_box}>
                <button className={`${styles.action_btn} ${styles.btn_green}`}
                        disabled={!isButtonsAvailable}
                        onClick={handleLetterSelect}>הוסף אות
                </button>
                <button className={`${styles.action_btn} ${styles.btn_red}`}
                        disabled={!isButtonsAvailable}
                        onClick={handleLetterRemove}>מחק אות
                </button>
            </div>

            {
                currentWord.length > 0 && (
                    <div className={styles.current_word} onClick={handleWordSelect}>
                        <div className={styles.title}>
                            המילה הנוכחית:
                        </div>
                        <div className={styles.word}>
                            {currentWord}
                        </div>
                    </div>
                )
            }


            <ul className={styles.words_list}>
                {currentWords.map((w, i) => {
                    return <li className={styles.word_box} key={`${i}_${w}`}>{w}</li>
                })}
            </ul>
        </div>
    );
}
