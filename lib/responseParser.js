class ResponseParser {
  constructor(response) {
    this.response = response;
  }

  getFirstArtist() {
    let artist = null;

    try {
      artist = this.response.results.artistmatches.artist[0];
      artist.thumbnail = ResponseParser.getImageUrlFromArtist(artist);
    } catch(e) {
      console.error(e);
    }

    return artist;
  }

  getArtistInlineQuery() {
    let response = [];
    let count = 10;

    try {
      let artists = this.response.results.artistmatches.artist.slice(0, 50);

      if (artists.length) {
        artists.forEach((artist) => {
          response.push({
            type: 'article',
            id: '' + count++,
            title: artist.name,
            url: artist.url,
            thumb_url: ResponseParser.getImageUrlFromArtist(artist),
            input_message_content: {
              message_text: `
                ${artist.name}\n${artist.url}\n${ResponseParser.getImageUrlFromArtist(artist)}
              `,
              parse_mode: 'HTML'
            }
          });
        });
      }
    } catch(e) {
      console.error(e);
    }

    return response;
  }

  static getImageUrlFromArtist(artist, size = 'large') {
    if (artist && artist.image.length) {
      return artist.image.find(image => {
        return image.size == size
      })['#text'];
    }
  }
}

module.exports = ResponseParser;