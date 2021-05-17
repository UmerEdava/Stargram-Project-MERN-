import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';
import CardActions from '@material-ui/core/CardActions';

export default function Dashboard(){
    document.body.style.backgroundColor = '#eef1f6';
    

    return(
    <>
    <div className="sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures">
        <div className="nano">
            <div className="nano-content">
                <ul>
                    <li className="label" >Main</li>

                    <li className="active"><a><i className="ti-home"></i> Dashboard</a></li>
                    
                    <li><a className="sidebar-sub-toggle"><i className="ti-pencil-alt"></i>Celebrities <span className="badge badge-primary">28</span><span className="sidebar-collapse-icon ti-angle-down"></span></a>
                        <ul>
                            <li><a href="school-student.html">All Stars</a></li>
                            <li><a href="school-student-profile.html">Top Stars</a></li>
                            <li><a href="school-student-details.html">Management</a></li>
                        </ul>
                    </li>

                    <li><a className="sidebar-sub-toggle"><i className="ti-cup"></i> Users<span className="badge badge-primary">7</span> <span className="sidebar-collapse-icon ti-angle-down"></span></a>
                        <ul>
                            <li><a href="restaurant-menu-one.html">All Users</a></li>
                            <li><a href="restaurant-menu-two.html">Top Users</a></li>
                            <li><a href="restaurant-menu-three.html">Management</a></li>
                        </ul>
                    </li>

                    <li className="label">Apps</li>
                    <li><a className="sidebar-sub-toggle"><i className="ti-bar-chart-alt"></i>  Charts  <span className="sidebar-collapse-icon ti-angle-down"></span></a>
                        <ul>
                            <li><a href="chart-flot.html">Flot</a></li>
                            <li><a href="chart-morris.html">Morris</a></li>
                            <li><a href="chartjs.html">Chartjs</a></li>
                            <li><a href="chartist.html">Chartist</a></li>
                            <li><a href="chart-peity.html">Peity</a></li>
                            <li><a href="chart-sparkline.html">Sparkle</a></li>
                            <li><a href="chart-knob.html">Knob</a></li>
                        </ul>
                    </li>
                    <li><a href="app-event-calender.html"><i className="ti-calendar"></i> Calender </a></li>
                    <li><a href="app-email.html"><i className="ti-email"></i> Email</a></li>
                    <li><a href="app-profile.html"><i className="ti-user"></i> Profile</a></li>
                    <li><a href="app-widget-card.html"><i className="ti-layout-grid2-alt"></i> Widget</a></li>
                    <li className="label">Features</li>
                    <li><a className="sidebar-sub-toggle"><i className="ti-layout"></i> UI Elements <span className="sidebar-collapse-icon ti-angle-down"></span></a>
                        <ul>
                            <li><a href="ui-accordion.html">Accordion</a></li>
                            <li><a href="ui-alerts.html">Alerts</a></li>
                            <li><a href="ui-badges.html">Badges</a></li>
                            <li><a href="ui-button.html">Button</a></li>
                            <li><a href="ui-dropdown.html">Dropdown</a></li>
                            <li><a href="http://webstrot.com/html/webstrotadmin/bootstrap3/default/ui-Images.html">Images</a></li>
                            <li><a href="ui-list-group.html">List Group</a></li>
                            <li><a href="ui-panels.html">Panels</a></li>
                            <li><a href="ui-progressbar.html">Progressbar</a></li>
                            <li><a href="ui-tab.html">Tab</a></li>
                            <li><a href="ui-wells.html">Wells</a></li>
                        </ul>
                    </li>
                    <li><a className="sidebar-sub-toggle"><i className="ti-panel"></i> Components <span className="sidebar-collapse-icon ti-angle-down"></span></a>
                        <ul>
                            <li><a href="uc-calendar.html">Calendar</a></li>
                            <li><a href="uc-carousel.html">Carousel</a></li>
                            <li><a href="uc-weather.html">Weather</a></li>
                            <li><a href="uc-datamap.html">Datamap</a></li>
                            <li><a href="uc-todo-list.html">To do</a></li>
                            <li><a href="uc-scrollable.html">Scrollable</a></li>
                            <li><a href="uc-sweetalert.html">Sweet Alert</a></li>
                            <li><a href="uc-toastr.html">Toastr</a></li>
                            <li><a href="uc-range-slider-basic.html">Basic Range Slider</a></li>
                            <li><a href="uc-range-slider-advance.html">Advance Range Slider</a></li>
                            <li><a href="uc-nestable.html">Nestable</a></li>
                            <li><a href="uc-portlets.html">Portlets</a></li>
                            <li><a href="uc-rating-bar-rating.html">Bar Rating</a></li>
                            <li><a href="uc-rating-jRate.html">jRate</a></li>
                        </ul>
                    </li>
                    <li><a className="sidebar-sub-toggle"><i className="ti-layout-grid4-alt"></i> Table <span className="sidebar-collapse-icon ti-angle-down"></span></a>
                        <ul>
                            <li><a href="table-basic.html">Basic</a></li>
                            <li><a href="table-data.html">Datatable</a></li>
                            <li><a href="table-export.html">Datatable Export</a></li>
                            <li><a href="table-row-select.html">Datatable Row Select</a></li>
                            <li><a href="table-jsgrid.html">Editable </a></li>
                        </ul>
                    </li>
                    <li><a className="sidebar-sub-toggle"><i className="ti-heart"></i> Icons <span className="sidebar-collapse-icon ti-angle-down"></span></a>
                        <ul>
                            <li><a href="font-themify.html">Themify</a></li>
                        </ul>
                    </li>
                    <li><a className="sidebar-sub-toggle"><i className="ti-map"></i> Maps <span className="sidebar-collapse-icon ti-angle-down"></span></a>
                        <ul>
                            <li><a href="gmaps.html">Basic</a></li>
                            <li><a href="vector-map.html">Vector Map</a></li>
                        </ul>
                    </li>
                    <li className="label">Form</li>
                    <li><a href="form-basic.html"><i className="ti-view-list-alt"></i> Basic Form </a></li>
                    <li className="label">Miscellaneous</li>
                    <li><a className="sidebar-sub-toggle"><i className="ti-files"></i> Invoice <span className="sidebar-collapse-icon ti-angle-down"></span></a>
                        <ul>
                            <li><a href="invoice.html">Basic</a></li>
                            <li><a href="invoice-editable.html">Editable</a></li>
                        </ul>
                    </li>
                    <li><a className="sidebar-sub-toggle"><i className="ti-target"></i> Pages <span className="sidebar-collapse-icon ti-angle-down"></span></a>
                        <ul>
                            <li><a href="page-login.html">Login</a></li>
                            <li><a href="page-register.html">Register</a></li>
                            <li><a href="page-reset-password.html">Forgot password</a></li>
                        </ul>
                    </li>
                    <li><a href="http://www.webstrot.com/html/webstrotadmin/bootstrap3/documentation/index.html"><i className="ti-file"></i> Documentation</a></li>
                    <li><a><i className="ti-close"></i> Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
    {/* // <!-- /# sidebar --> */}
    <div className="header">
        <div className="pull-left">
            <div className="logo"><a href="index.html">
                {/* <!-- <img src="assets/images/logo.png" alt="" /> --> */}
                <span>Stargram Admin</span></a></div>
            <div className="hamburger sidebar-toggle">
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
        </div>

        <div className="pull-right p-r-15">
            <ul>
                <li className="header-icon dib"><i className="ti-bell"></i>
                    <div className="drop-down">
                        <div className="dropdown-content-heading">
                            <span className="text-left">Recent Notifications</span>
                        </div>
                        <div className="dropdown-content-body">
                            <ul>
                                <li>
                                    <a href="#">
                                        <img className="pull-left m-r-10 avatar-img" src="assets/images/avatar/3.jpg" alt="" />
                                        <div className="notification-content">
                                            <small className="notification-timestamp pull-right">02:34 PM</small>
                                            <div className="notification-heading">Mr.  Ajay</div>
                                            <div className="notification-text">5 members joined today </div>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <img className="pull-left m-r-10 avatar-img" src="assets/images/avatar/3.jpg" alt="" />
                                        <div className="notification-content">
                                            <small className="notification-timestamp pull-right">02:34 PM</small>
                                            <div className="notification-heading">Mr.  Ajay</div>
                                            <div className="notification-text">likes a photo of you</div>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <img className="pull-left m-r-10 avatar-img" src="assets/images/avatar/3.jpg" alt="" />
                                        <div className="notification-content">
                                            <small className="notification-timestamp pull-right">02:34 PM</small>
                                            <div className="notification-heading">Mr.  Ajay</div>
                                            <div className="notification-text">Hi Teddy, Just wanted to let you ...</div>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <img className="pull-left m-r-10 avatar-img" src="assets/images/avatar/3.jpg" alt="" />
                                        <div className="notification-content">
                                            <small className="notification-timestamp pull-right">02:34 PM</small>
                                            <div className="notification-heading">Mr.  Ajay</div>
                                            <div className="notification-text">Hi Teddy, Just wanted to let you ...</div>
                                        </div>
                                    </a>
                                </li>
                                <li className="text-center">
                                    <a href="#" className="more-link">See All</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li className="header-icon dib"><i className="ti-email"></i>
                    <div className="drop-down">
                        <div className="dropdown-content-heading">
                            <span className="text-left">2 New Messages</span>
                            <a href="http://webstrot.com/html/webstrotadmin/bootstrap3/default/email.html"><i className="ti-pencil-alt pull-right"></i></a>
                        </div>
                        <div className="dropdown-content-body">
                            <ul>
                                <li className="notification-unread">
                                    <a href="#">
                                        <img className="pull-left m-r-10 avatar-img" src="assets/images/avatar/1.jpg" alt="" />
                                        <div className="notification-content">
                                            <small className="notification-timestamp pull-right">02:34 PM</small>
                                            <div className="notification-heading">Mr.  Ajay</div>
                                            <div className="notification-text">Hi Teddy, Just wanted to let you ...</div>
                                        </div>
                                    </a>
                                </li>

                                <li className="notification-unread">
                                    <a href="#">
                                        <img className="pull-left m-r-10 avatar-img" src="assets/images/avatar/2.jpg" alt="" />
                                        <div className="notification-content">
                                            <small className="notification-timestamp pull-right">02:34 PM</small>
                                            <div className="notification-heading">Mr.  Ajay</div>
                                            <div className="notification-text">Hi Teddy, Just wanted to let you ...</div>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <img className="pull-left m-r-10 avatar-img" src="assets/images/avatar/3.jpg" alt="" />
                                        <div className="notification-content">
                                            <small className="notification-timestamp pull-right">02:34 PM</small>
                                            <div className="notification-heading">Mr.  Ajay</div>
                                            <div className="notification-text">Hi Teddy, Just wanted to let you ...</div>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <img className="pull-left m-r-10 avatar-img" src="assets/images/avatar/2.jpg" alt="" />
                                        <div className="notification-content">
                                            <small className="notification-timestamp pull-right">02:34 PM</small>
                                            <div className="notification-heading">Mr.  Ajay</div>
                                            <div className="notification-text">Hi Teddy, Just wanted to let you ...</div>
                                        </div>
                                    </a>
                                </li>
                                <li className="text-center">
                                    <a href="#" className="more-link">See All</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li className="header-icon dib"><img className="avatar-img" src="assets/images/avatar/1.jpg" alt="" /> <span className="user-avatar"> Admin <i className="ti-angle-down f-s-10"></i></span>
                    <div className="drop-down dropdown-profile">
                        <div className="dropdown-content-heading">
                            <span className="text-left">Upgrade Now</span>
                            <p className="trial-day">30 Days Trail</p>
                        </div>
                        <div className="dropdown-content-body">
                            <ul>
                                <li><a href="#"><i className="ti-user"></i> <span>Profile</span></a></li>
                                <li><a href="#"><i className="ti-wallet"></i> <span>My Balance</span></a></li>
                                <li><a href="#"><i className="ti-write"></i> <span>My Task</span></a></li>
                                <li><a href="#"><i className="ti-calendar"></i> <span>My Calender</span></a></li>
                                <li><a href="#"><i className="ti-email"></i> <span>Inbox</span></a></li>
                                <li><a href="#"><i className="ti-settings"></i> <span>Setting</span></a></li>
                                <li><a href="#"><i className="ti-help-alt"></i> <span>Help</span></a></li>
                                <li><a href="#"><i className="ti-lock"></i> <span>Lock Screen</span></a></li>
                                <li><a href="#"><i className="ti-power-off"></i> <span>Logout</span></a></li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    {/* Content */}
    <div className='content-wrap'>
        <div className='main'>
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-lg-8 p-r-0 title-margin-right">
                        <div className="page-header">
                            <div className="page-title">
                                <h1>Dashboard</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 p-l-0 title-margin-left">
                        <div className="page-header">
                            <div className="page-title">
                                <ol className="breadcrumb text-right">
                                    <li><a href="#">Dashboard</a></li>
                                    <li className="active">Home</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='main-content'>
                    <div className='row' style={{marginTop:'7.5px'}}>
                        <div className='col-md-3' style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}>
                        <Card width='28px' style={{boxShadow:'none',borderRadius:'0'}}>
                            <CardContent>
                            
                                    <div class="media-left meida media-middle">
                                        <span><i class="ti-bag f-s-22 color-primary border-primary round-widget"></i></span>
                                    </div>
                                    <div class="media-body media-text-right">
                                        <h4 style={{fontSize:'18px'}}>$1278</h4>
                                        <h6 style={{fontSize:'12px'}}>Earning</h6>
                                    </div>                                
                            
                            </CardContent>
                        </Card>
                        </div>
                        <div className='col-md-3' style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}>
                        <Card width='28px' style={{boxShadow:'none',borderRadius:'0'}}>
                            <CardContent className='text-right'>
                            <div class="media-left meida media-middle">
                                        <span><i class="ti-bag f-s-22 color-primary border-primary round-widget"></i></span>
                                    </div>
                                    <div class="media-body media-text-right">
                                        <h4 style={{fontSize:'18px'}}>$1278</h4>
                                        <h6 style={{fontSize:'12px'}}>Earning</h6>
                                    </div> 
                            </CardContent>
                        </Card>
                        </div>
                        <div className='col-md-3' style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}>
                        <Card width='28px' style={{boxShadow:'none',borderRadius:'0'}}>
                            <CardContent className='text-right'>
                                    <div class="media-left meida media-middle">
                                        <span><i class="ti-bag f-s-22 color-primary border-primary round-widget"></i></span>
                                    </div>
                                    <div class="media-body media-text-right">
                                        <h4 style={{fontSize:'18px'}}>$1278</h4>
                                        <h6 style={{fontSize:'12px'}}>Earning</h6>
                                    </div> 
                            </CardContent>
                        </Card>
                        </div>
                        <div className='col-md-3' style={{paddingLeft:'7.5px',paddingRight:'7.5px'}}>
                        <Card width='28px' style={{boxShadow:'none',borderRadius:'0'}}>
                            <CardContent className='text-right'>
                                    <div class="media-left meida media-middle">
                                        <span><i class="ti-bag f-s-22 color-primary border-primary round-widget"></i></span>
                                    </div>
                                    <div class="media-body media-text-right">
                                        <h4 style={{fontSize:'18px'}}>$1278</h4>
                                        <h6 style={{fontSize:'12px'}}>Earning</h6>
                                    </div> 
                            </CardContent>
                        </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
   
    </>
    )
}