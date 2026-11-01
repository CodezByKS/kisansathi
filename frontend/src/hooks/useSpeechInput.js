import { useEffect, useRef, useState } from "react";

const SpeechRecognition =
  typeof window !== "undefined" ? window.SpeechRecognition || window.webkitSpeechRecognition : null;

export default function useSpeechInput(lang = "hi-IN") {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const recRef = useRef(null);
  const supported = Boolean(SpeechRecognition);

  function start(onFinalResult) {
    if (!supported) return;
    const rec = new SpeechRecognition();
    rec.lang = lang;
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      setListening(true);
      setError("");
      setTranscript("");
    };
    rec.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
      if (event.results[event.results.length - 1].isFinal) onFinalResult(text);
    };
    rec.onerror = (event) => setError(event.error);
    rec.onend = () => setListening(false);

    recRef.current = rec;
    rec.start();
  }

  function stop() {
    recRef.current?.stop();
  }

  useEffect(() => () => recRef.current?.abort(), []);

  return { supported, listening, transcript, error, start, stop };
}