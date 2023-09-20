import RoleDescription from "../layout/RoleDescription";
import { useParams } from 'react-router-dom';


function RolePage() {
    const { roleListingId } = useParams();

    return (
        <RoleDescription roleListingId={roleListingId}/>
    )
    
}

export default RolePage;