import React from 'react'
import './MessagePage.css'

export default function MessagePage() {
    return (
        <div>
            <div className="text-center box-parent">
                <div className="box">
                    <div className="row">
                        <div className="col-6">
                            <h6>Inbox</h6>
                        </div>
                        <div className="col-6">
                            <h6>Drafts</h6>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}