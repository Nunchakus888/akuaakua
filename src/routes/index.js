import { useRoutes } from 'react-router-dom';

// project import
import IndexRoutes from './IndexRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([IndexRoutes]);
}
