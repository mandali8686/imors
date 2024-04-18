import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelectedSong } from "../../../../../context/selectedSong/SelectedSongContext";
import { getVideoURLs } from "../../../../../api/video";

const GalleryGrid = () => {
  const { selectedSong } = useSelectedSong();
  const [videoUrls, setVideoUrls] = useState([]);

  useEffect(() => {
    if (!selectedSong) {
      setVideoUrls([]);
      return;
    }

    async function fetchVideoURLs() {
      try {
        const urls = await getVideoURLs(selectedSong._id);
        if (Array.isArray(urls)) {
          // Check if the response is an array
          setVideoUrls(urls);
        } else {
          console.error("Received data is not an array:", urls);
          setVideoUrls([]); // Set to empty array if response is not an array
        }
      } catch (error) {
        console.error("Failed to fetch video URLs:", error);
        setVideoUrls([]);
      }
    }

    fetchVideoURLs();
  }, [selectedSong]);

  return (
    <Container>
      <Row xs="auto" sm="auto" md="auto" lg="auto">
        {videoUrls.map((videoUrl, index) => (
          <Col key={index} style={{ marginBottom: "1rem" }}>
            <video controls style={{ maxWidth: "30rem" }}>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GalleryGrid;
