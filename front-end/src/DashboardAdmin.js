import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { NavLink, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { IoPeople } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './DashboardAdmin.css';
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import auth from './authentication'
import {NavbarCustom} from './Navbar.js';

var options = auth()

const images = [
    {
      url: 'data:image/png;base64,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',
      title: 'POS',
      width: '20%',
      route: 'POS',
    },
    {
      url: 'data:image/png;base64,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',
      title: 'Merchandise Management',
      width: '20%',
      route: 'merchandise',
    },
    {
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAzFBMVEWAAID///99AH16AHqBAIG9fb13AHf+/P779/uFAIX9+v389/z37/f37ff16fXNnc3x4vHWttbizOLp1enw4PCKAIqRNZHs1+yyb7Lgw+Dm0ObRrdHIoMjXsteFEoXw5PCcSpzGjsa4gLilUKWVMZW+jr6hRqHfvt/UqtSvZK/cxNyQI5CpbKnBhcGIIYilYqWrW6u1fLWKLIqTO5PHlsecUJyeO57KpsrBmMGaUprQotDKlcqhSqGXLZfmy+a0brS4hrjUutSqaaqVHZUI33uIAAAQaUlEQVR4nNWd6WKyOhCGYUAs7lZr3beqrdqqXey+f/d/TwesW0ZCSBjU8/7sEvKQkEkmk4mmR6x44sRRodLIdmIrdbJXlWrK+XEiHvXjdV2Lruh4KtNq5TvDxzPNsiyDlfMTOHuc3dQKrVYqEV0lIiOM56qjp/LgzLAMANA4AnBQ7cdyfVQtJqOpSDSE6c/88/BDMwwuGuaE8axfq2QiqEsEhJlG/7pkG/yG41Gavd9+rUhdHWrCVCP2MtEk6TaU2mT++5oirREtYbV87+Ap0a0ptWZpeElYJ0LCxNtYtmvymtI4u2nRmREywleLAm8JacDslKq30rWhTQb4B3mRb5FUjO47vDFIEZ3e+kBSLzrCoklMWKqQ1IuOMDmk+xAXhL80ow2htRjRdtNJnqZahIStd8pGhDlRtSgtfo20m1LZfdI5TYnQJA6oakVJmPymIzTIpm6kM+/8mAoQemSVIiVMT6ka0SIaSHXq1dMDkdWHR7o1FC1h8Z6mEQmbkHqNHyMBhAE76U5dvJ4oV4mYsNokQayxpWZN66ORUZzEUftpKOY10C4wZWacAQygXVPzVFETXlrhCc1ntrlqi44B9m9Dpa+S+9rOQjcitKtMienrZZHQvP6UrxA5YSf0CsPssiWONt4DKHWkzUhIwlQnhn6SDgsIJbahUrdb7wy0d9l1cRjCePFLswzkjk+UwzZimS3wFL0AiMmNOOqEqcIXODBGB/381LvegdU8Z4o72Xlj1sdIZitHlTB1WobFo+ED2an0LNRYYwzZ4gq7E0HQHiSaUY3wZNRtrl9tA/2yFgZQM9gm1Idend4YnkZLWO32Nu0EU/TbQpjJKVywheU4f1aqBbWNCoTJm/vt3Qm4Q0Yq0Q9DyE5n9C/OuAWT74B2Q57w8t5kCcxv9Bf5sTIiXLBNk+bOc0GbBUOUJcwNd7ZfYI52/ZLX6oTo+yr7lARngXYb5QiTV2OPXmPX0Z+9qq4wYJhmCvJfb4J2GmC9IUVYuPXcP4Nrtl56rq3YiPYPW1DH32cAdoC5uARhIt/jfPbjEfrTrhogTNmVb3EueFMwqQs/xuCEub7Nex700dTtfKJEaD+xxdSFbh9oPoiCOAITfg59ntPD3/yFSjeVbkL3fyZdQUcNStjo+T3NqKFPXmkhbKMNw3wQzx1oXxSEJ2/+EQgwwJ+DwkIY5uxssxWwIxiz8ISpoahJLDxPzMqvocwOW8RP0JdkdfyMRhDC3KOwuoDfY0p6Wx9KbBOmgn/L8OaznApAeOr7Ca6EwgriMdlGNG7YEiQ2XGHyxEcUEsYvA+2ZGdibUZV18Jto2iDjl4S7PLejCgnzgVrQMUzo/1KS2/r4FX1K9QEocReMAsJ4bRKwonCFX43kaIq6+UAy9K+UUyOsBY5Tgzb614JUHY0Y280+Za0NDDiW35/wSsJwT9CubbwuU0kbNYG8s8dCDp5AhHIzk1v036NgX/BCRpedXn4qTGwt/J2ICfPcqbaXoI18SKnb4AatiQaKW3lApx94jjY+hBWJNlg84BkVUAu8EIZbdtb3qeTMgnevRT+f8FT2KXhpoGdegpYwZvd8431puj91PZZSXMKi/E5g8weVcRPQ6sM124RVVX9kE22t+hHKGmxXBnbwnd8FKwRX7EnVkwX3yBnJJ0zGFBZ4MK6iYoK9JpiynasgOQBsycAuIy7hq9JWrlFHs8NKoKo22WE+UQ+xewU7URzehMFqtlv8I94xCdIa0GYXBi31JnT7ER5PPQmLqk5rA29fBpkU4RntVagNyJ1Fjhdh6lf5S79A3TR5Jv6ff+z/JD5CRgKgbRQvwhCxW4D7iHghbL1SNuFu3KYHYUV9Y0UzsOOrKCoLztCa4F/YYA4U479LGMRL6VM86qapL0FpRpa2CV2jyIx3O4TJfrgP/Q2VN/InhDGaJRDEGbPhKjuElXBnX+AeNWLO32UGz6ypaBAExsH99swDE6ZVt41WaqKFcMJ3IYz3A5I0MbjfW68NE76F/gx+UYm+zkjos+NMPqhbyFdMIyLCYujzWWwXcZuly680dpGl1HeP2XIfNi8OEV6EP/di4gNZPgth+Ga/WtlFN7fcrc7PEjYookNfkNXnx7dDj/1ok99UB4uM+vpLZAhTJGHaNl6G8udIyHk1knIM+QnGa38DQ/hAEsNsIKeLXuTZOOSADGmKGW1i4bcJi2EtxZ9gjH1enJgRQB7OIlkTugu51Re+TfhAdNDVwHvrn5w/ZNda8fDBt9uVWA3pW4QFmiZ0BxB8gvfRM0gFLQLSpCeJ1zGOW4TK/p/d0rErwXMhbKHZD2kTOkpgQgX3IU+7uyQezQP/2D+JUz19KeMVEcZrhK/Qwk43j/bBHg/ys+ADRJiW3LDzLx1v67d2TCIM2OEoFWLd7a27c5ZQ0b3GESCTuButjd1+b5SPX2gZ27EmVIpi4monvn2E/gDa7HiboRrItx4xTWwTCv0pkqWXUHDETvjPEzvnrtMcCWPqcP+5TciLNlZVE8W3x1lb5HV4i1z26zYhbd4Oj/h2tBBGe4016ucv6rBYmy0Jw3u4cOl3yBjEt6fVeL8480v9/L+nFDaEtOPMQuh8FhPfbvbR76JoQudTya8Ji3fkpcMcbeunN3sFcM/+Lh36rBSnDvU1YZZ+JNsJ+N1+CNo9GUXThH8B6H+EylsxvsWjrbZNfHuT9XPsTgeoqjAoLAmV98191cTx7eXlLwIc3iKSG3+yIFQ+H+Er4xsthFcHvS0U/+R5eIumCj9LQsKMHVva3Y79m9zjw1sZgsPRHLmhVi7heajdJp/yvePb8R7jLLImdF5mZkF4SZaSBJW/k93CjW83huyUNRfZV+iuslsLQjr3BZKBxxp3IWyjH9IkmuDI6S8aOixNWz764vSWrRlltmHPCRMT7coauYQF0gxWjACNmomyYaOVbz/CTuo6NuMO4ak4XkL5ATj049T6ZecB5/QrX6YCXy7hT3RjmdZEo2nmAs3lniNtQmdWk9D0VDdCQg3FIcSLrPOCzAvNEfw70cKenxc8oe1/yrMWbRM66zSHsEXuxtsWjm9n1YporrGRlXIIo30Ejm9nlI/22Y6soqaPopsWarvJZhhJHN5SlVXR4grn6GRk4oPeWxJEE1HIaGjxqJafS8GUd1yHs+lGKyOrJSj3K7yEJzEbVSL9Pv5kvGknoWMBRc/o8g6UR/1uF0+PaSdRWyQY78bPLyR9eEtFDmEq8q5iPHsf8CTOO8x5eEzLRU4IPc9uWlHLSiAph3APn7t3ttWsFu0gvnx2TGtE/xzvjLmJ1gVhonqeHMKIDf5CFieRTHHYDHmXglAO4cMeCLELeKNq+Y7kQgX+o2Oa9Ll5FZn8HCuV217A21qUtC9C30sAKt/j6NrRmdPsh7DtlyUvOep7JWcikTMv3QuhNsFp6xBjoWNHUw9nbbEfQm3GX2EslGjFrChq4qwP90QItjBlZebLpv8enTX+ngid/gJfOUHCo2L5jto+Won9ETqMZrcgyFtV7d7TtqN9sk9Ch3H8fSpg/OxTMrr+Uuq4VcETodcVpcmtPvfIGF2f9z7mpcwzoSTK6JwoPFDZR3ffYg9rCySAu/K5gDHdoVlbGdm4RpFiXFYA5kzAqCfLJkFftU51rXgAQkdgzAoC25GOlczQjC1dSx6G0LWP5YIgrWOu3w7H6B4Oit7Xxpdhd0cCxvOHdpg5AMzSDmH4RPghajDuVgS5uavP7+rfo9FPOoR7cK3z5djHa8GtQPFiXXmNbPzoupbYi9uSL8d2TAWMiVb2TM12LOLa4uFP/oYUQHMmutUhcWMrtCO8L2ITfw41mG5XxRhUBbYj/tCTHnMWWyaa3jp0Gy7k2kfBuJp+aEseUAQ38MMhPORguiUwyyLbkXuey9hHGFcWhJnoQqIkBc3bvICxWJ8H76swLS4IowtrkxeMr68E9rH4NAhqH2GRDl/T47UjGGrWgubU3y2nxzO1j2AbHn/5p7ToIuUVBc22aA5w0jgLwLg8tuLGJh50VuMhMB5Fczn9Smw74FpfEmaIklEQCqxH0Z3Oydd507/ezdcVoS6VaHRPAmM42kkuxyr9OvWzj6vc0i5hPpLDCGEF9q/oprVMfcq3j6t8Bi5hNeIQSFWBPX0VzQFqQx7j6iS1S3gSPJXqngXNl1fBmJP5ufCck8OZviEku1wzAjm2wzt57kbJyj8P27EOwF4QViKNlw8pZ5HcENmOy10fsrHq3wtCovxTUQmsj0vRVSQNZDs2oQN/p/OCJos9lMB6/8HZRHBfvZoym6zrsNY/QpXk0vsVwLwm2GRNXV2vr0qDzWVQy3PAR7OC4gvMaV3EmL9eteMm5HNJ+Hb8hK59fMmK/ACjxY1bMNv06SVh+njWiH5ybEdWsP+Yqg4sgK1kXKuMA/uIZqUQaD3RGln/7G0f918Ryl0ncUiB9e8qJbiNbLud17lNwua23aMcxlor8A3Pa0LyvBFRCoxBPdDFeduE0R4OIhdo8+dgjGvCxD7CMCkF5rwf5MLVTa6v6v+rETWXsf0m8AMwhJRZC/clx3a8Sdyd90mUPHSvAsO88Z/nbBEq35txYFn4sDGXUPHuk4PL9l9XMflLu0e+TPSU0fc3/gwhN5XqEQt6giUVm0e48z8kfBLM31Au6CPZLQ0uEIVXY8JDRLmFEv/8JodQ4b6zw8rrhid/QuULWA6inQTwAQjj9UPXWkZNn4PiPEI9HUmCv2gEM2Ef9bqjRPq+tcPJFI2j3oR69rj29fniXHgoJkwe3663pwR3OfsQUmWfj1icA9SBCPXL/0E/hQlOJCZDqP8PfDbNusgx7EsYdTqQ8DJjwfoo93bAFsF1LFEK5oLtRCHhkXveYMLJtSFBqFeOeCEF+H48JUK9JgiqOpwABOGLAQmjSJNOIjDx3W6qhInj9C6C3Qm87yQg1FPH6AUHm5uzSJ6Q8IYpOskCCm6PP0LEWIAloQTh0SHu3AIamlBPRptBVVIgDygk1BMPR2MXoXkjDygm1BP1I5nAwV1WWFklQvfehmP4GOFeGISpTKiPBodHhPaplKGXI9QL00MjivcnwhHq6W60CatEsr4ExxNDE+r61QHHG7AD+Q1DEuqfL1HnVuPxme/B17thCPVU9yCWESbdIIFBFITOovhl/18jtPOyM9EQhHrxe8/NCNp30Ag9GkI9WXnfa06iXiVcA8oTOoydvfVUw+yE+gIVCXU9E/ggbiiBJsxhExWhrl++R/45gtmWcahRE7oHOAlvJ/bgs+f4TuE9E+p6TuZgvCyf+ZJVnYXSETqWoxYNI8D8KayFoCF02jE/JM92DMbFT05tmcRRGEL3gMqXRphBFgxtWJV0FgoVjlB37eM/g8R6ABhjCvuHFZrQ0edXKWxOZ9Cad0NRukE1URA6vbVxO59oik0JAJP59RV171yJhtBRrtG/LtmyHdbpmmbvt9+gMw47IiN0lP7MP08/TCPg2OPQaeNZv1aJ4OPbEiWh7qblqo6ebgdnhuW0Jg/U+Y3ze/vxqz6q5pQ8hDIiJnQVT2VaxXxn+HhmWpZlsHJ+AmePs06+0GqJztjRKALCP8UTJ44KlUb2LbZSJ3tVKaScHyf2wvan/wA7mhj5mBc13wAAAABJRU5ErkJggg==',
      title: 'Sales Analysis',
      width: '20%',
      route: 'sales',
    },
    {
      url: 'data:image/png;base64,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',
      title: 'Customer Details',
      width: '20%',
      route: 'customer',
    },
    {
      url: 'data:image/png;base64,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',
      title: 'Cashier Registration',
      width: '20%',
      route: 'cashier',
    },
  ];

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 200,
      width: '90%',
      marginTop: 100,
      justifyContent: 'center',
      marginBottom: 100,
    },
    image: {
      position: 'relative',
      height: 250,
    //   [theme.breakpoints.down('xs')]: {
    //     width: '100% !important', // Overrides inline-style
    //     height: 200,
    //   },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
      borderRadius: '25px'
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
      fontSize: 19
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  }));
  

function Dashboard() {
  const classes = useStyles();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  const logoutF=()=>{
    
    localStorage.clear()
  
  
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="md" sticky="top" className="navbar">
        <Link to="/admin/dashboard"><Navbar.Brand style={{color:"white"}}>SMAART ADMIN PANEL</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle nav>
                <span>Admin</span>
                <IoPeople  style={{color: 'white', marginLeft:'4px'}} size={32}/>
              </DropdownToggle>
              <DropdownMenu id="collasible-nav-dropdown2">
                <DropdownItem >
                  <span className="navdd"><CgProfile/> {localStorage.getItem('user')}</span>
                </DropdownItem>
                <NavDropdown.Divider />
                <DropdownItem >
                  <span className="navdd"><MdEmail/> Details</span>
                </DropdownItem>
                <NavDropdown.Divider />
                <DropdownItem tag={Link} to="/">
                  <span className="navdd" onClick={(e)=>{logoutF()}}><IoMdLogOut/> Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    <div className="mb-15">
      <div className={classes.root}>
        {images.map((image) => (
          <ButtonBase
            focusRipple
            key={image.title}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
              marginLeft: '6%',
              marginTop: '5%',  
            }}>
              <Link to={`/admin/${image.route}`}>
                <span className={classes.imageSrc} style={{backgroundImage: `url(${image.url})`,borderRadius:'25px'}}/>
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                  <Typography component="span" variant="subtitle2" color="inherit" className={classes.imageTitle}>
                    {image.title}
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </Link>
          </ButtonBase>
        ))}
      </div>
    </div></div>
  );
}

export default Dashboard