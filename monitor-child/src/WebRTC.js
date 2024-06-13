import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WebRTC = () => {
    const { room } = useParams();
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [pc, setPc] = useState(new RTCPeerConnection());
    const [localStream, setLocalStream] = useState(null);

    useEffect(() => {
        const setupWebRTC = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideoRef.current.srcObject = stream;
            setLocalStream(stream);

            pc.onicecandidate = event => {
                if (event.candidate) {
                    sendSignalData(JSON.stringify({ candidate: event.candidate }));
                }
            };

            pc.ontrack = event => {
                remoteVideoRef.current.srcObject = event.streams[0];
            };

            stream.getTracks().forEach(track => {
                pc.addTrack(track, stream);
            });

            const signalDataResponse = await axios.get(`/signal_data/${room}`);
            const signalData = signalDataResponse.data.data;
            if (signalData) {
                const { offer, answer } = JSON.parse(signalData);
                if (offer) {
                    await pc.setRemoteDescription(new RTCSessionDescription(offer));
                    const answer = await pc.createAnswer();
                    await pc.setLocalDescription(answer);
                    sendSignalData(JSON.stringify({ answer }));
                } else if (answer) {
                    await pc.setRemoteDescription(new RTCSessionDescription(answer));
                }
            }
        };

        setupWebRTC();
    }, [room]);

    const sendSignalData = async (data) => {
        await axios.post('/signal_data', { signal_data: { room, data } });
    };

    const createOffer = async () => {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        sendSignalData(JSON.stringify({ offer }));
    };

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted></video>
            <video ref={remoteVideoRef} autoPlay></video>
            <button onClick={createOffer}>Start Call</button>
        </div>
    );
};

export default WebRTC;
