import {io, Socket} from "socket.io-client";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

export let socket:  Socket<DefaultEventsMap, DefaultEventsMap>;
socket = io("http://localhost:3001");