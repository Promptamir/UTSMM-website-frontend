import { Icon } from '@iconify/react'
import React from 'react'
import { useFetch } from '../../../../lib/useFetch'
import { API } from '../../../../lib/envAccess'

const UserQuickView = ({orders, spend, balance, activeOrders}) => {
    return (
        <div className="user-quick-view">
            <div className="item">
                <div className="left">
                    <Icon icon="eva:done-all-outline" />
                </div>
                <div className="right">
                    <div className="header">
                        Total Orders
                    </div>
                    <div className="body">
                        {orders}
                    </div>
                </div>


            </div>
            <div className="item">
                <div className="left">
                <Icon icon="ph:bag-fill" />
                </div>
                <div className="right">
                    <div className="header">
                        Total Spend
                    </div>
                    <div className="body">
                        ${spend}
                    </div>
                </div>


            </div>
            <div className="item">
                <div className="left">
                <Icon icon="heroicons-solid:cash" />
                </div>
                <div className="right">
                    <div className="header">
                        Account Balance
                    </div>
                    <div className="body">
                        ${balance}
                    </div>
                </div>


            </div>
            <div className="item">
                <div className="left">
                <Icon icon="mdi:notifications-active" />
                </div>
                <div className="right">
                    <div className="header">
                       Active Orders
                    </div>
                    <div className="body">
                        {activeOrders}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default UserQuickView