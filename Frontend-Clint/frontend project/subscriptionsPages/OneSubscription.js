import React, { useContext } from 'react';
import { useParams,Link } from 'react-router-dom';
import { SubscriptionsContext } from '../context/subscriptionsContext';
import Member from './Member';
import ErrorComp from '../error/ErrorComp';
function OneSubscription() {
    const {id} = useParams()
    const {findMemberByMemberId} = useContext(SubscriptionsContext)
    const renderMember=()=>{
        const subscription = findMemberByMemberId(id)
        if(subscription)
         return (
            <Member
                key={subscription._id}
                subId={subscription._id}
                member={subscription.memberId}
                movies={subscription.movies}
            />
        );
        else return <ErrorComp error={"No Member found with the given id"}/>
    }
    return (
        <div>
            {renderMember()}
            <Link style={{color:"rgb(108, 212, 139)"}} to="/subscriptions">Go back to Subscriptions list</Link>
        </div>
    );
}

export default OneSubscription;