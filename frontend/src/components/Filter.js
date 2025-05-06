import React from 'react';

export default function Filter({filter, setFilter} ) {
    return (
        <div className="d-flex justify-content-center gap-2 mb-3">
            <button
                className={`btn btn-sm ${filter === 'all' ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => setFilter('all')}
            >All
            </button>
            <button
                className={`btn btn-sm ${filter === 'completed' ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => setFilter('completed')}
            >Completed
            </button>
            <button
                className={`btn btn-sm ${filter === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => setFilter('pending')}
            >Pending
            </button>
        </div>
    );
}