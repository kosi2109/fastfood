import { HiLocationMarker } from "react-icons/hi";

const MapPointer = ({color = "black"}: any) => (
    <div>
      <HiLocationMarker size={30} color={color} />
    </div>
);

export default MapPointer;