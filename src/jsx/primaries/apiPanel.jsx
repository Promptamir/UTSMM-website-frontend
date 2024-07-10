// Importing part
import '../../css/style/apiPanel.css';
import {Icon} from "@iconify/react";
import { Prism } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactDropdown from "react-dropdown";
import {useState} from "react";

// Creating and exporting api panel as default
export default function ApiPanel({isPage = false}) {
    // Defining states of component
    const [selectedAddOrder, setSelectedAddOrder] = useState('default');

    // Defining constants of component
    const AddOrderOptions = [
        {
            name : "default",
            items: [
                {label: 'key', value: 'Your API key'},
                {label: 'action', value: 'add'},
                {label: 'service', value: 'Service ID'},
                {label: 'link', value: 'Link to page'},
                {label: 'quantity', value: 'Needed quantity'},
                {label: 'runs (optional)', value: 'Runs to deliver'},
                {label: 'interval (optional)', value: 'Interval in minutes'},
            ]
        },
        {
            name : "package",
            items: [
                {label: 'key', value: 'Your API key'},
                {label: 'action', value: 'add'},
                {label: 'service', value: 'Service ID'},
                {label: 'link', value: 'Link to page'},
            ]
        },
        {
            name : "seo",
            items: [
                {label: 'key', value: 'Your API key'},
                {label: 'action', value: 'add'},
                {label: 'service', value: 'Service ID'},
                {label: 'link', value: 'Link to page'},
                {label: 'quantity', value: 'Needed quantity'},
                {label: 'keywords', value: 'Keywords list separated by \\r\\n or \\n\\n'},
            ]
        },
        {
            name : "custom_comments",
            items: [
                {label: 'key', value: 'Your API key'},
                {label: 'action', value: 'add'},
                {label: 'service', value: 'Service ID'},
                {label: 'link', value: 'Link to page'},
                {label: 'comments', value: 'Comments list separated by \\r\\n or \\n\\n'},
            ]
        },
        {
            name : "mentions_hashtag",
            items: [
                {label: 'key', value: 'Your API key'},
                {label: 'action', value: 'add'},
                {label: 'service', value: 'Service ID'},
                {label: 'link', value: 'Link to page'},
                {label: 'quantity', value: 'Needed quantity'},
                {label: 'hashtag', value: 'Hashtag to scrape usernames from'},
            ]
        },
        {
            name : "custom_comments_package",
            items: [
                {label: 'key', value: 'Your API key'},
                {label: 'action', value: 'add'},
                {label: 'service', value: 'Service ID'},
                {label: 'link', value: 'Link to page'},
                {label: 'comments', value: 'Comments list separated by \\r\\n or \\n\\n'},
            ]
        },
        {
            name : "comments_likes",
            items: [
                {label: 'key', value: 'Your API key'},
                {label: 'action', value: 'add'},
                {label: 'service', value: 'Service ID'},
                {label: 'link', value: 'Link to page'},
                {label: 'quantity', value: 'Needed quantity'},
                {label: 'username', value: 'Username of the comment owner'},
            ]
        },
        {
            name : "poll",
            items: [
                {label: 'key', value: 'Your API key'},
                {label: 'action', value: 'add'},
                {label: 'service', value: 'Service ID'},
                {label: 'link', value: 'Link to page'},
                {label: 'quantity', value: 'Needed quantity'},
                {label: 'answer_number', value: 'Answer number of the poll'},
            ]
        }
    ];

    // Returning JSX
    return (
        <div className={'api-panel'}>
            <div className="inner" data-page={isPage}>
                <div className={'top-side'}>
                    <div className={'item'}>
                        <div className={'icon-holder'}>
                            <Icon icon={'ph:code-thin'} width={20} height={20} color={'currentColor'}
                                  fill={'currentColor'}/>
                        </div>
                    </div>
                </div>
                <div className="bottom-side">
                    <div className={'info-holder'}>
                        <div className={'info'}>
                            <span className={'info-value'}>POST</span>
                            <span className={'info-title'}>HTTP Method</span>
                        </div>
                        <div className={'info'}>
                            <span className={'info-value'}>https://back.utsmm.com/api/v2</span>
                            <span className={'info-title'}>API Url</span>
                        </div>
                        <div className={'info'}>
                            <span className={'info-value'}>Get on the <a href="#">Account Page</a></span>
                            <span className={'info-title'}>API</span>
                        </div>
                        <div className={'info'}>
                            <span className={'info-value'}>JSON</span>
                            <span className={'info-title'}>Response Format</span>
                        </div>
                    </div>
                    <div className="service-list">
                        <h1 className={'title'}>Service list</h1>
                        <div className={'grid'}>
                            <div className={'item'}>Key</div>
                            <div className={'item'}>Your API Key</div>
                            <div className={'item'}>action</div>
                            <div className={'item'}>Services</div>
                        </div>
                    </div>
                    <h3 className={'title-3'}>Example response</h3>
                    <Prism language="json" style={dracula}>
                        {JSON.stringify([
                            {
                                "service": 1,
                                "name": "Followers",
                                "type": "Default",
                                "category": "First Category",
                                "rate": "0.90",
                                "min": "50",
                                "max": "10000",
                                "refill": true,
                                "cancel": true
                            },
                            {
                                "service": 2,
                                "name": "Comments",
                                "type": "Custom Comments",
                                "category": "Second Category",
                                "rate": "8",
                                "min": "10",
                                "max": "1500",
                                "refill": false,
                                "cancel": true
                            }
                        ], null, 2)}
                    </Prism>
                    <div className="box">
                        <div className="title">Add order</div>
                        <ReactDropdown
                            value={selectedAddOrder}
                            onChange={(e) => setSelectedAddOrder(e.value)}
                            options={AddOrderOptions.map(item => {
                                return {
                                    value: item.name,
                                    label: item.name.replace('_', ' ')
                                };
                            })}
                        />
                        <div className="grid">
                            {
                                AddOrderOptions.find(item => item.name === selectedAddOrder).items.map((item, index) => (
                                    <>
                                        <div className={'item'}>{item.label}</div>
                                        <div className={'item'}>{item.value}</div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                    <h3 className={'title-3'}>Example response</h3>
                    <Prism language="json" style={dracula}>{JSON.stringify({"order": 23501}, null, 2)}</Prism>
                    <div className="box">
                        <div className="title">Order status</div>
                        <div className="grid">
                            <div className={'item'}>key</div>
                            <div className={'item'}>Your API key</div>
                            <div className={'item'}>action</div>
                            <div className={'item'}>status</div>
                            <div className={'item'}>order</div>
                            <div className={'item'}>Order ID</div>
                        </div>
                    </div>
                    <h3 className={'title-3'}>Example response</h3>
                    <Prism language="json" style={dracula}>{JSON.stringify({
                        "charge": "0.27819",
                        "start_count": "3572",
                        "status": "Partial",
                        "remains": "157",
                        "currency": "USD"
                    }, null, 2)}</Prism>
                    <div className="box">
                        <div className="title">Multiple orders status</div>
                        <div className="grid">
                            <div className={'item'}>key</div>
                            <div className={'item'}>Your API key</div>
                            <div className={'item'}>action</div>
                            <div className={'item'}>status</div>
                            <div className={'item'}>orders  </div>
                            <div className={'item'}>Order IDs (separated by a comma, up to 100 IDs)</div>
                        </div>
                    </div>
                    <h3 className={'title-3'}>Example response</h3>
                    <Prism language="json" style={dracula}>{JSON.stringify({
                        "1": {
                            "charge": "0.27819",
                            "start_count": "3572",
                            "status": "Partial",
                            "remains": "157",
                            "currency": "USD"
                        },
                        "10": {
                            "error": "Incorrect order ID"
                        },
                        "100": {
                            "charge": "1.44219",
                            "start_count": "234",
                            "status": "In progress",
                            "remains": "10",
                            "currency": "USD"
                        }
                    }, null, 2)}</Prism>
                    <div className="box">
                        <div className="title">Create refill</div>
                        <div className="grid">
                            <div className={'item'}>key</div>
                            <div className={'item'}>Your API key</div>
                            <div className={'item'}>action</div>
                            <div className={'item'}>refill</div>
                            <div className={'item'}>order</div>
                            <div className={'item'}>Order ID</div>
                        </div>
                    </div>
                    <h3 className={'title-3'}>Example response</h3>
                    <Prism language="json" style={dracula}>{JSON.stringify({"refill": "1"}, null, 2)}</Prism>
                    <div className="box">
                        <div className="title">Create multiple refill</div>
                        <div className="grid">
                            <div className={'item'}>key</div>
                            <div className={'item'}>Your API key</div>
                            <div className={'item'}>action</div>
                            <div className={'item'}>refill</div>
                            <div className={'item'}>orders</div>
                            <div className={'item'}>Order IDs (separated by a comma, up to 100 IDs)</div>
                        </div>
                    </div>
                    <h3 className={'title-3'}>Example response</h3>
                    <Prism language="json" style={dracula}>{JSON.stringify([
                        {
                            "order": 1,
                            "refill": 1
                        },
                        {
                            "order": 2,
                            "refill": 2
                        },
                        {
                            "order": 3,
                            "refill": {
                                "error": "Incorrect order ID"
                            }
                        }
                    ], null, 2)}</Prism>
                    <div className="box">
                        <div className="title">Get refill status</div>
                        <div className="grid">
                            <div className={'item'}>key</div>
                            <div className={'item'}>Your API key</div>
                            <div className={'item'}>action</div>
                            <div className={'item'}>refill_status</div>
                            <div className={'item'}>refill</div>
                            <div className={'item'}>Refill ID</div>
                        </div>
                    </div>
                    <h3 className={'title-3'}>Example response</h3>
                    <Prism language="json" style={dracula}>{JSON.stringify({"status": "Completed"}, null, 2)}</Prism>
                    <div className="box">
                        <div className="title">Get multiple refill status</div>
                        <div className="grid">
                            <div className={'item'}>key</div>
                            <div className={'item'}>Your API key</div>
                            <div className={'item'}>action</div>
                            <div className={'item'}>refill_status</div>
                            <div className={'item'}>refills	</div>
                            <div className={'item'}>Refill IDs (separated by a comma, up to 100 IDs)</div>
                        </div>
                    </div>
                    <h3 className={'title-3'}>Example response</h3>
                    <Prism language="json" style={dracula}>{JSON.stringify([
                        {
                            "refill": 1,
                            "status": "Completed"
                        },
                        {
                            "refill": 2,
                            "status": "Rejected"
                        },
                        {
                            "refill": 3,
                            "status": {
                                "error": "Refill not found"
                            }
                        }
                    ], null, 2)}</Prism>
                    <div className="box">
                        <div className="title">Create cancel</div>
                        <div className="grid">
                            <div className={'item'}>key</div>
                            <div className={'item'}>Your API key</div>
                            <div className={'item'}>action</div>
                            <div className={'item'}>cancel</div>
                            <div className={'item'}>orders</div>
                            <div className={'item'}>Order IDs (separated by a comma, up to 100 IDs)</div>
                        </div>
                    </div>
                    <h3 className={'title-3'}>Example response</h3>
                    <Prism language="json" style={dracula}>{JSON.stringify([
                        {
                            "order": 9,
                            "cancel": {
                                "error": "Incorrect order ID"
                            }
                        },
                        {
                            "order": 2,
                            "cancel": 1
                        }
                    ], null, 2)}</Prism>
                    <div className="box">
                        <div className="title">User balance</div>
                        <div className="grid">
                            <div className={'item'}>key</div>
                            <div className={'item'}>Your API key</div>
                            <div className={'item'}>action</div>
                            <div className={'item'}>balance</div>
                        </div>
                    </div>
                    <h3 className={'title-3'}>Example response</h3>
                    <Prism language="json" style={dracula}>{JSON.stringify({
                        "balance": "100.84292",
                        "currency": "USD"
                    }, null, 2)}</Prism>
                </div>
            </div>
        </div>
    );
}
