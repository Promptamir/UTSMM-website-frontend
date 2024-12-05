import { Icon } from '@iconify/react'
import React from 'react'
import { useFetch } from '../../../../../../lib/useFetch'
import { API } from '../../../../../../lib/envAccess'

export default function QuickView({orders,countOfOrders,income,customers}) {
    return (
        <div className="quick-view">
            <div className="item progressing">
                <div className="item-header">
                    Orders
                </div>
                <div className="item-body">
                    <Icon icon="material-symbols:order-play" />
                    <span>{orders}</span>
                </div>
            </div>
            <div className="item progressing">
                <div className="item-header">
                    Success orders
                </div>
                <div className="item-body">
                    <Icon icon="icon-park-solid:sales-report" />
                    <span>{countOfOrders}</span>
                </div>
            </div>
            <div className="item regressing">
                <div className="item-header">
                    Income
                </div>
                <div className="item-body">
                    <Icon icon="healthicons:money-bag" />
                    <span>${income}</span>
                </div>
            </div>
            <div className="item regressing">
                <div className="item-header">
                    Total Customers
                </div>
                <div className="item-body">
                    <Icon icon="carbon:user-filled" />
                    <span>{customers}</span>
                </div>
            </div>
        </div>
    )
}
