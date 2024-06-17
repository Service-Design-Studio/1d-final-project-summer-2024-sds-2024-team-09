import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WebRTC = () => {
    const { room } = useParams();
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [pc, setPc] = useState(null);

    useEffect(() => {
        const pc = new RTCPeerConnection(); // Create a new RTCPeerConnection instance
        setPc(pc); // Save the instance in the state

        const sendSignalledData = async (data) => {
            await axios.post('/signal_data', { signal_data: { room, data } });
        };

        const setupWebRTC = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideoRef.current.srcObject = stream;

            pc.onicecandidate = event => {
                if (event.candidate) {
                    sendSignalledData(JSON.stringify({ candidate: event.candidate }));
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
                    sendSignalledData(JSON.stringify({ answer }));
                } else if (answer) {
                    await pc.setRemoteDescription(new RTCSessionDescription(answer));
                }
            }
        };

        setupWebRTC();
    }, [room]);

    // send signal data to the server
    const sendSignalData = async (data) => {
        await axios.post('/signal_data', { signal_data: { room, data } });
    };

    const createRoom = async () => {
        const newRoom = room;  // Generate a unique room ID
        try {
            const response = await axios.post('/create_room', { room: newRoom });
            const { room } = response.data;
            window.location.href = `/webrtc/${room}`;  // Redirect to the new room
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    const createOffer = async () => {
        console.log("Hello");
        console.log(room);
        await createRoom();  // i want to create a room before creating an offer
        console.log("Checkpoint 1");
        const offer = await pc.createOffer();
        console.log("Checkpoint 2");
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
