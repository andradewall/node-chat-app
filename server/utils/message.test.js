var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
   it('should generate the correct message obj', () => {
      var from = 'Jen';
      var text = 'Some message';
      var message = generateMessage(from, text);
      
      expect(message.createdAt).toBeA('number');
      expect(message).toInclude({from, text});
   });
});

describe('generateLocationMessage', () => {
   it('should generate correct location object', () => {
      var from = 'Jen';
      var latitude = '-22';
      var longitude = '-33';
      var url = `https://www.google.com/maps?q=-22,-33`;
      var message = generateLocationMessage(from, latitude, longitude);

      expect(message.createdAt).toBeA('number');
      expect(message).toInclude({from, url});
   });
})