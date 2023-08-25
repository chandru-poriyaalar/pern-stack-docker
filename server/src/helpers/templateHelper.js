const _ =  require('lodash');

const flattenObject = (o, prefix = '', result = {}, keepNull = true)  => {
    if (_.isString(o) || _.isNumber(o) || _.isBoolean(o) || (keepNull && _.isNull(o))) {
      result[prefix] = o;
      return result;
    }
      
    if (_.isArray(o) || _.isPlainObject(o)) {
      for (let i in o) {
        let pref = prefix;
        if (_.isArray(o)) {
          pref = pref + `[${i}]`;
        } else {
          if (_.isEmpty(prefix)) {
            pref = i;
          } else {
            pref = prefix + '.' + i;
          }
        }
        flattenObject(o[i], pref, result, keepNull);
      }
      return result;
    }
    return result;
  }

const convert = (string = '', context) => {
    if(_.isEmpty(string)) {
        return ''
    }

    let stringConverted = string;
    context = flattenObject(context);
    console.log(context);
    Object.keys(context).map((key) => {
        let value = context[key];
        stringConverted = stringConverted.replace(`{{${key}}}`, value);
    })
    return stringConverted;
};

const convertPayload = (payload, context) => {
    if(_.isEmpty(payload)) {
        return '';
    }

    if(typeof payload === 'string') {
        return convert(payload, context);
    }

    if(_.isArray(payload)) {
        return payload.map((item) => {
            if(item === 'string') {
                return convert(item, context);
            }
            return convertPayload(item, context);
        })
    }

    Object.keys(payload).map((key) => {
        let template = payload[key];
        if(typeof template === 'object') {
            template = convertPayload(template, context)
        }
        payload[key] = convert(template, context)
    });
    return payload;
};

module.exports = {
    convertPayload,
    convert
}