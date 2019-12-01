import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io();

export default function useSocket(cb) {
	const [activeSocket, setActiveSocket] = useState(null);

	useEffect(() => {
		// debug("Socket updated", { socket, activeSocket });
		if (activeSocket || !socket) return;
		cb && cb(socket);
		setActiveSocket(socket);
		return function cleanup() {
			// debug("Running useSocket cleanup", { socket });
			socket.off("message.chat1", cb);
		};
	}, [socket]);

	return activeSocket;
}
