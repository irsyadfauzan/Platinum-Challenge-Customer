// import dayjs from 'dayjs';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  CardBody,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row
} from 'reactstrap';

import Vector from '../assets/image/Vector.png';
import VectorFlip from '../assets/image/VectorFlip.png';
import FooterModule from '../components/Footer';
import HeaderModule from '../components/Header';
// import { getBinarById } from '../services/MobilApi';
import carPrice from '../hooks/carPrice';
import { getDetailCars, postCars} from '../redux/features/carSlice';
// import { selectDateRange } from '../redux/features/dateSlice';

function Pembayaran() {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(true);
  // const dates = useSelector(selectDateRange);
  // const detailMobil = useSelector(selectDetailCars);
  const { binarId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { finalPrice, dates, dateDiff, detailMobil } = carPrice();

  // const date1 = dayjs(dates[0]);
  // const date2 = dayjs(dates[1]);
  // const dateDiff = date2.diff(date1, 'day');

  // const finalPrice = dateDiff * detailMobil.price;

  // const getDetailSewa = async () => {
  //   const res = await getBinarById(binarId);
  //   setDetailMobil(res.data);
  // };
  const date1 = dayjs(dates[0]).format('YYYY-MM-DD');
  const date2 = dayjs(dates[1]).format('YYYY-MM-DD')

  const postData = {
    "start_rent_at": date1,
    "finish_rent_at": date2,
    "car_id": detailMobil.id
  }

  const handlePost = () => {
    try {
      dispatch(postCars(postData));
      navigate(`/Konfirmasi/${detailMobil.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    setClose(false);
    setOpen(true);
  };

  const handleClose = () => {
    setClose(true);
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getDetailCars(binarId));
  }, [binarId]);

  if (!detailMobil) return <div>Loading...</div>;

  return (
    <div style={{ margin: 'auto' }}>
      <HeaderModule />
      <div
        style={{
          height: '200px',
          backgroundColor: '#F1F3FF',
          position: 'relative',
          zIndex: '-2'
        }}
      />
      <Container style={{ marginTop: '-50px' }}>
        <Card>
          <CardBody>
            <p className="dropdown">Detail Pesananmu</p>
            <Row>
              <Col sm={3}>
                <p>Nama/Tipe Mobil</p>
                <br />
                <p>{detailMobil.name}</p>
              </Col>
              <Col sm={3}>
                <p>Kategori</p>
                <br />
                <p>{detailMobil.category}</p>
              </Col>
              <Col sm={3}>
                <p>Tanggal Mulai Sewa</p>
                <br />
                <p>{dates[0]}</p>
              </Col>
              <Col sm={3}>
                <p>Tanggal Akhir Sewa</p>
                <br />
                <p>{dates[1]}</p>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <br />
        <Row>
          <Col md={7}>
            <Card>
              <CardBody>
                <p className="dropdown">Pilih Bank Transfer</p>
                <p>
                  Kamu bisa membayar dengan transfer melalui ATM, Internet
                  Banking atau Mobile Banking
                </p>
                <br />
                <ListGroup flush>
                  <ListGroupItem>
                    <Row>
                      {' '}
                      <Card
                        style={{
                          width: '61px',
                          height: '30px',
                          paddingLeft: '14px',
                          paddingTop: '2px'
                        }}
                      >
                        BCA
                      </Card>
                      &nbsp;&nbsp;&nbsp;BCA Transfer
                    </Row>
                  </ListGroupItem>
                  <br />
                  <ListGroupItem>
                    <Row>
                      {' '}
                      <Card
                        style={{
                          width: '61px',
                          height: '30px',
                          paddingLeft: '15px',
                          paddingright: '0px',
                          paddingTop: '2px'
                        }}
                      >
                        BNI
                      </Card>
                      &nbsp;&nbsp;&nbsp;BNI Transfer
                    </Row>
                  </ListGroupItem>
                  <br />
                  <ListGroupItem>
                    {' '}
                    <Row>
                      {' '}
                      <Card
                        style={{
                          width: '61px',
                          height: '30px',
                          paddingLeft: '4px',
                          paddingRight: '0px',
                          paddingTop: '2px'
                        }}
                      >
                        Mandiri
                      </Card>
                      &nbsp;&nbsp;&nbsp;Mandiri Transfer
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col md={5}>
            <Card>
              <CardBody>
                <p>{detailMobil.name}</p>
                <p>{detailMobil.category}</p>
                {open && (
                  <div>
                    {' '}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <p>
                        Total &nbsp;{' '}
                        <a href="#" type="button" onClick={handleClose}>
                          <img src={Vector} alt="dropdown" />
                        </a>{' '}
                      </p>
                      <p>&nbsp; Rp. {finalPrice}</p>
                    </div>
                    <p>Harga</p>
                    <ul>
                      <li>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <p>
                            Sewa Mobil Rp. {detailMobil.price} x {dateDiff} Hari
                          </p>
                          Rp. {finalPrice}{' '}
                        </div>
                      </li>
                    </ul>
                    <p>Biaya Lainnya</p>
                    <ul>
                      <li>
                        {' '}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          Pajak <p style={{ color: '#5CB85F' }}>Termasuk</p>
                        </div>
                      </li>
                      <li>
                        {' '}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          Biaya makan sopir{' '}
                          <p style={{ color: '#5CB85F' }}>Termasuk</p>
                        </div>
                      </li>
                    </ul>
                    <p>Belum Termasuk</p>
                    <ul>
                      <li>Bensin</li>
                      <li>Tol dan parkir</li>
                    </ul>
                    <br />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <p>Total &nbsp; </p>
                      <p>&nbsp; Rp. {finalPrice}</p>
                    </div>
                    <br />
                  </div>
                )}
                {close && (
                  <div>
                    {' '}
                    <p>
                      Total &nbsp;{' '}
                      <a href="#" type="button" onClick={handleOpen}>
                        <img src={VectorFlip} alt="dropdown" />
                      </a>{' '}
                      &nbsp; Rp. {finalPrice}
                    </p>
                  </div>
                )}
                <button
                  onClick={handlePost}
                  type="button"
                  style={{ width: '100%' }}
                  className="button1 shadow"
                >
                  Bayar
                </button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <FooterModule />
    </div>
  );
}

export default Pembayaran;