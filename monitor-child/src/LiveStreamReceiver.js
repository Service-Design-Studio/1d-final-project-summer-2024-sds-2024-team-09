// src/components/LiveStreamReceiver.js
import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LiveStreamReceiver = () => {
    const { room } = useParams();
    const remoteVideoRef = useRef(null);
    const [pc, setPc] = useState(new RTCPeerConnection());

    useEffect(() => {
        const setupWebRTC = async () => {
            pc.onicecandidate = event => {
                if (event.candidate) {
                    sendSignalData(JSON.stringify({ candidate: event.candidate }));
                }
            };

            pc.ontrack = event => {
                remoteVideoRef.current.srcObject = event.streams[0];
            };

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

    return (
        <div>
            <video ref={remoteVideoRef} autoPlay></video>
        </div>
    );
};

export default LiveStreamReceiver;
