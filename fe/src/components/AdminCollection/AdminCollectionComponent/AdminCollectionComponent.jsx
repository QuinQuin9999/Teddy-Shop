import React from 'react'
import CreateCollectionComponent from '../CreateCollectionComponent/CreateCollectionComponent'
import CollectionList from '../CollectionList/CollectionList';

const AdminCollectionPage = () => {

    
    return (
        <div className="admin-page" style={{margin: '0 5%'}}>
            <div className="collection-workspace">
                <CreateCollectionComponent />
                <p></p>
                <CollectionList />
            </div>
        </div>
    )
}

export default AdminCollectionPage