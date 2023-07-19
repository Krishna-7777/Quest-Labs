import React, { useState } from 'react';
import "./T2S.css"

const Text2SpeechButton = ({ text }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayButtonClick = async () => {
        try {
            let audioContext = new AudioContext()
            setIsPlaying(undefined)
            text=text.slice(0,100)
            let audio = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM`, {
                method: 'POST',
                headers: {
                    'accept': 'audio/mpeg',
                    'xi-api-key': process.env.REACT_APP_t2sKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text,
                    model_id: 'eleven_monolingual_v1',
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.5
                    }
                })
            });
            audio = await audio.arrayBuffer()
            let audioBuffer = await audioContext.decodeAudioData(audio)
            setIsPlaying(true);
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start();
            setIsPlaying(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button onClick={handlePlayButtonClick} disabled={isPlaying}>
                {isPlaying==undefined ? "loading..":isPlaying?'Playing...' : 'Play Audio'}
            </button>
        </div>
    );
};

export default Text2SpeechButton;
