
import React, {FC} from 'react';
import Sidebar from "@/components/Sidebar";
import CardPage from '@/app/dashboard/card/[chatid]/page';
import Chats from "@/app/dashboard/chat/page";




const Dashboard:FC<{children:React.ReactNode}> = ({children}) => {



    return (
        <div className="flex h-screen">
            {/* Sidebar - Fixed */}
            <div className="w-64 h-full fixed">
                <Sidebar/>
            </div>

            {/* Content area with margin to account for the fixed sidebar */}
            <div className="flex-1 ml-64 overflow-auto">
                {children}
            </div>
        </div>
    );
};

export default Dashboard;