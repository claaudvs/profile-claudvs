import { useState } from "preact/hooks";

interface GreetingProps {
    messages: string[];
}
export default function Greeting({ messages }: GreetingProps) {
     const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

    const [message, setMessage] = useState(messages[0]);

    return (
        <>
            <div>
                <h3>{message}! Thank you for visiting!</h3>
                <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setMessage(randomMessage())}>
                    New Greeting
                </button>
            </div>
        </>
    );
}