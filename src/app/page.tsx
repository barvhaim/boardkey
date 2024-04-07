"use client";

import styles from "./page.module.scss";
import {useEffect, useState} from "react";


const hebrewLetters = [
    'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ך', 'ל', 'מ', 'ם',
    'נ', 'ן', 'ס', 'ע', 'פ', 'ף', 'צ', 'ץ', 'ק', 'ר', 'ש', 'ת'
];

export default function Home() {
    const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<any>(null);
    const [currentWord, setCurrentWord] = useState<string>("");
    const [currentWords, setCurrentWords] = useState<string[]>([]);
    const [isButtonsAvailable, setIsButtonsAvailable] = useState<boolean>(true);
    const [letterFontSize, setLetterFontSize] = useState<number>(10);
    const [letterDelaySpeed, setLetterDelaySpeed] = useState<number>(4000);

    const delay = (5000 + 100) - letterDelaySpeed;

    const handleLetterSelect = () => {
        setIsButtonsAvailable(false);
        clearInterval(intervalId);
        setCurrentLetterIndex(0);
        setCurrentWord(prevState => prevState.concat(hebrewLetters[currentLetterIndex]));

        setTimeout(() => {
            const id = setInterval(() => {
                setCurrentLetterIndex(prevState => (prevState + 1) % hebrewLetters.length);
            }, delay);
            setIntervalId(id);
            setIsButtonsAvailable(true);
        }, 100);
    }

    const handleLetterRemove = () => {
        setIsButtonsAvailable(false);
        clearInterval(intervalId);
        setCurrentLetterIndex(0);
        setCurrentWord(prevState => prevState.slice(0, -1));

        setTimeout(() => {
            const id = setInterval(() => {
                setCurrentLetterIndex(prevState => (prevState + 1) % hebrewLetters.length);
            }, delay);
            setIntervalId(id);
            setIsButtonsAvailable(true);
        }, 100);
    }

    const handleWordsRemove = () => {
        setCurrentWords([]);
    }

    const handleWordSelect = () => {
        setCurrentWords(prevState => [...prevState, currentWord]);
        setCurrentWord("");
    }

    useEffect(() => {
        if (intervalId) clearInterval(intervalId);

        const id = setInterval(() => {
            setCurrentLetterIndex(prevState => (prevState + 1) % hebrewLetters.length);
        }, delay);
        setIntervalId(id);

        return () => {
            clearInterval(id);
        };
    }, [letterDelaySpeed]);


    return (
        <div className={styles.container}>
            <div className={styles.current_letter_box}>
                <div style={{fontSize: `${letterFontSize}em`}}>
                    {hebrewLetters[currentLetterIndex]}
                </div>
                <div style={{
                    width: '100%', textAlign: 'right',
                    padding: '0 2rem .5rem 2rem'
                }}>
                    <div>גודל אות:</div>
                    <input type="range"
                           value={letterFontSize}
                           min={0.1}
                           max={20}
                           onChange={(e) => {
                               setLetterFontSize(Number(e.target.value));
                           }}
                           style={{width: '100%'}}
                    />
                </div>
                <div style={{
                    width: '100%', textAlign: 'right',
                    padding: '0 2rem 0rem 2rem'
                }}>
                    <div>מהירות:</div>
                    <input type="range"
                           value={letterDelaySpeed}
                           min={2000}
                           max={5000}
                           onChange={(e) => {
                               setLetterDelaySpeed(Number(e.target.value));
                           }}
                           style={{width: '100%'}}
                    />
                </div>
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
                <button className={`${styles.action_btn}`}
                        onClick={handleWordsRemove}>מחק מילים
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
