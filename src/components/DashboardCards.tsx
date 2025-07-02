import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

interface CardData {
  title: string;
  count: number;
}

const cards: CardData[] = [
  { title: 'Free', count: 10 },
  { title: 'Occupied', count: 17 },
  { title: 'New requests', count: 2 },
];

const DashboardCards: React.FC = () => (
  <Row className="mb-3">
    {cards.map((card, idx) => (
      <Col key={idx}>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <h2>{card.count}</h2>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
);

export default DashboardCards;
