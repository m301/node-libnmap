/*!
 * node-libnmap
 * Copyright(c) 2013-2015 Jason Gerfen <jason.gerfen@gmail.com>
 * License: MIT
 */

var nmap = require('../')
  , fs = require('fs')
  , path = './scans/'
  , opts = {
      timeout: 100,
      range: ['scanme.nmap.org', 'localhost', '172.17.190.0/24'],
      ports: '21,22,80,443'
    };

nmap.scan(opts, function(err, report) {
  if (err) throw new Error(err);

  for (var item in report) {
    for (var host in report[item].host) {

      var data = JSON.stringify(report[item].host[host])
        , filename = report[item].host[host].address.addr;

      fs.writeFile(path+filename+'.json', data, function(error) {
        if (error) throw error;
        console.log('Wrote report for '+filename);
      });
    }
  }
});