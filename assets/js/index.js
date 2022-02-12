// Global Constants

const 	DRIVES = {
			"number": {
				"identifier": "input-floating-drives-number",
				"default value": 0
			},
			"size": {
				"identifier": "input-floating-drives-size",
				"default value": 0
			},
			"unit": {
				"identifier": "select-floating-drives-size-unit",
				"default value": "TB"
			}
		},

		TOTAL_CAPACITY = { 
			"raw": { 
				"binary": {
					"identifier": "span-total-raw-capacity-binary",
					"default value": 0
				},
				"decimal": {
					"identifier": "span-total-raw-capacity-decimal",
					"default value": 0
				}
			}, 
			"usable": { 
				"binary": {
					"identifier": "span-total-usable-capacity-binary",
					"default value": 0
				},
				"decimal": {
					"identifier": "span-total-usable-capacity-decimal",
					"default value": 0
				},
				"progress bar": {
					"identifier": "div-progress-bar-total-usable-capacity",
					"default value": 0
				}
			}
		},

		RAID_OPTIONS = { 
			"RAID 0": { 
				"button identifier": "btn-RAID-0", 
				"value": 0 
			}, 
			"RAID 1": { 
				"button identifier": "btn-RAID-1", 
				"value": 1
			}, 
			"RAID 5": { 
				"button identifier": "btn-RAID-5", 
				"value": 5
			}, 
			"RAID 6": { 
				"button identifier": "btn-RAID-6", 
				"value": 6
			}, 
			"RAID 10": { 
				"button identifier": "btn-RAID-10", 
				"value": 10
			}, 
			"RAID 50": { 
				"button identifier": "btn-RAID-50", 
				"value": 50
			}, 
			"RAID 60": { 
				"button identifier": "btn-RAID-60", 
				"value": 60
			}
		}/*,

		DECIMAL_STORAGE_UNITS = {

		},

		BINARY_STORAGE_UNITS = {

		}*/;




_convert_capacity(1000, "YB", "TiB");

// FUNCTIONS
// Other
function _round_to(number, decimal_digits) {
	var multiplier = Math.pow(10, Math.abs(decimal_digits)),
	adjusted_number = number * multiplier,
	truncated_number = Math[adjusted_number < 0 ? 'ceil' : 'floor'](adjusted_number);
	return truncated_number / multiplier;
}

// Common functions
function _set_value(element_identifier, value) {
	var el = document.querySelector('#' + element_identifier);
	el.value = value;
}

function _get_value(element_identifier) {
	var el = document.querySelector('#' + element_identifier);
	return el.value;
}

function _set_inner_text(element_identifier, text) {
	var el = document.querySelector('#' + element_identifier);
	el.innerText = text;
}

function _set_width(element_identifier, width) {
	var el = document.querySelector('#' + element_identifier);
	el.style.width = width + "%";
}

function _set_invalid(element_identifier) {
	var el = document.querySelector('#' + element_identifier);
	el.classList.add('is-invalid');
}

function _unset_invalid(element_identifier) {
	var el = document.querySelector('#' + element_identifier);
	el.classList.remove('is-invalid');
}

// Main Functions
function _reset() {
	_reset_drives_number();
	_reset_drives_size();
	_reset_drives_size_unit();
	_reset_raid_options();
	_reset_total_capacity();
}

function _drives_listener_trigged() {
	_reset_raid_options();
	_reset_total_capacity();
	if (_validate_drives()) {
		_update_raw_capacity();
		_update_raid_options();
	}
}

function _validate_drives() {
	if (_validate_drives_number() && _validate_drives_size() && _is_drives_size_different_from_default) {
		return true;
	}
	return false;
}

// INPUT
// Drives Number
function _reset_drives_number() {
	_set_value(DRIVES["number"]["identifier"], DRIVES["number"]["default value"]);
	_unset_invalid(DRIVES["number"]["identifier"]);
}

function _is_drives_number_valid() {
	if (Number.isInteger(parseFloat(_get_value(DRIVES["number"]["identifier"]))) && parseInt(_get_value(DRIVES["number"]["identifier"])) >= 0) {
		return true;
	}
	return false;
}

function _is_drives_number_different_from_default() {
	if (parseFloat(_get_value(DRIVES["number"]["identifier"])) !== DRIVES["number"]["default value"]) {
		return true;
	}
	return false;
}

function _validate_drives_number() {
	if (_is_drives_number_valid()) {
		_unset_invalid(DRIVES["number"]["identifier"]);
		if (_is_drives_number_different_from_default()) {
			return true;
		}
		return false;
	}
	_set_invalid(DRIVES["number"]["identifier"]);
	return false;
}

// Drives Size
function _reset_drives_size() {
	_set_value(DRIVES["size"]["identifier"], DRIVES["size"]["default value"]);
	_unset_invalid(DRIVES["size"]["identifier"]);
}

function _is_drives_size_valid() {
	if (parseInt(_get_value(DRIVES["size"]["identifier"])) >= 0) {
		return true;
	}
	return false;
}

function _is_drives_size_different_from_default() {
	if (parseFloat(_get_value(DRIVES["size"]["identifier"])) !== DRIVES["size"]["default value"]) {
		return true;
	}
	return false;
}

function _validate_drives_size() {
	if (_is_drives_size_valid()) {
		_unset_invalid(DRIVES["size"]["identifier"]);
		if (_is_drives_size_different_from_default()) {
			return true;
		}
		return false;
	}
	_set_invalid(DRIVES["size"]["identifier"]);
	return false;
}

// Drives Size Unit
function _reset_drives_size_unit() {
	_set_value(DRIVES["unit"]["identifier"], DRIVES["unit"]["default value"]);
	_unset_invalid(DRIVES["unit"]["identifier"]);
}

// Raid Options
function _disable_button(identifier) {
	btn = document.querySelector('#' + identifier);
	btn.setAttribute('disabled', 'disabled');
	btn.classList.remove('btn-dark');
	btn.classList.remove('btn-secondary');
	btn.classList.remove('btn-outline-secondary');
	btn.classList.add('btn-outline-secondary');
}

function _enable_button(identifier) {
	btn = document.querySelector('#' + identifier);
	btn.classList.remove('btn-dark');
	btn.classList.remove('btn-secondary');
	btn.classList.remove('btn-outline-secondary');
	btn.classList.add('btn-secondary');
	btn.removeAttribute('disabled');
}

function _select_button(identifier) {
	btn = document.querySelector('#' + identifier);
	btn.classList.remove('btn-primary');
	btn.classList.remove('btn-secondary');
	btn.classList.remove('btn-outline-secondary');
	btn.classList.add('btn-dark');
	btn.removeAttribute('disabled');
}

function _reset_raid_options() {
	for (raid_option in RAID_OPTIONS) {
		_disable_button(RAID_OPTIONS[raid_option]["button identifier"]);
	}
}

function _update_raid_options() {
	//_reset_raid_options();
	if(_get_value(DRIVES["number"]["identifier"]) == 1) {
		// Enable RAID 0
		_enable_button(RAID_OPTIONS["RAID 0"]["button identifier"]);
	} 

	if(_get_value(DRIVES["number"]["identifier"]) == 2) {
		// Enable RAID 0, 1
		_enable_button(RAID_OPTIONS["RAID 0"]["button identifier"]);
		_enable_button(RAID_OPTIONS["RAID 1"]["button identifier"]);
	} 

	if(_get_value(DRIVES["number"]["identifier"]) !== 2 && _get_value(DRIVES["number"]["identifier"]) >= 3) {
		// Enable RAID 0, 5
		_enable_button(RAID_OPTIONS["RAID 0"]["button identifier"]);
		_enable_button(RAID_OPTIONS["RAID 5"]["button identifier"]);
	}

	if(_get_value(DRIVES["number"]["identifier"]) >= 4) {
		if(_get_value(DRIVES["number"]["identifier"])%2 == 0) {
			// Enable RAID 6, 10
			_enable_button(RAID_OPTIONS["RAID 6"]["button identifier"]);
			_enable_button(RAID_OPTIONS["RAID 10"]["button identifier"]);
		}
		if(_get_value(DRIVES["number"]["identifier"])%2 == 1) {
			// Enable RAID 6
			_enable_button(RAID_OPTIONS["RAID 6"]["button identifier"]);
		} 
	}

	if(_get_value(DRIVES["number"]["identifier"]) >= 5 && _get_value(DRIVES["number"]["identifier"]) > 4) {
		if(_get_value(DRIVES["number"]["identifier"])%2 == 0) {
			// Enable RAID 0, 5, 6
			_enable_button(RAID_OPTIONS["RAID 0"]["button identifier"]);
			_enable_button(RAID_OPTIONS["RAID 5"]["button identifier"]);
			_enable_button(RAID_OPTIONS["RAID 6"]["button identifier"]);
		} 
	}

	if(_get_value(DRIVES["number"]["identifier"]) >= 6) {
		// Enable RAID 0, 50
		_enable_button(RAID_OPTIONS["RAID 0"]["button identifier"]);
		_enable_button(RAID_OPTIONS["RAID 50"]["button identifier"]);
	}

	if(_get_value(DRIVES["number"]["identifier"]) >= 8) {
		// Enable RAID 0, 60
		_enable_button(RAID_OPTIONS["RAID 0"]["button identifier"]);
		_enable_button(RAID_OPTIONS["RAID 60"]["button identifier"]);
	}
}

function _raid_option_triggered(raid_option) {
	_update_raid_options();
	_select_button(RAID_OPTIONS[raid_option]["button identifier"]);
	_update_usable_capacity(RAID_OPTIONS[raid_option]["value"]);
}

// Total Capacity
function _get_unit_decimal(unit) {
	unit_decimal = "null";
	switch (unit) {
		case 'TB':
		case 'TiB':
			unit_decimal = "TB";
			break;
		case 'GB':
		case 'GiB':
			unit_decimal = "GB";
			break;
		case 'MB':
		case 'MiB':
			unit_decimal = "MB";
			break;
		default:
			console.log('default');
	}

	return unit_decimal;
}

function _get_unit_binary(unit) {
	unit_binary = "null";
	switch (unit) {
		case 'TB':
		case 'TiB':
			unit_binary = "TiB";
			break;
		case 'GB':
		case 'GiB':
			unit_binary = "GiB";
			break;
		case 'MB':
		case 'MiB':
			unit_binary = "MiB";
			break;
		default:
			console.log('default');
	}

	return unit_binary;
}

function _get_bytes(unit) {
	bytes = 0;
	switch (unit) {
		case 'B': // Byte
			bytes = parseFloat(Math.pow(10, 0));
			break;
		case 'KB': // Kilobyte
			bytes = parseFloat(Math.pow(10, 3));
			break;
		case 'MB': // Megabyte
			bytes = parseFloat(Math.pow(10, 6));
			break;
		case 'GB': // Gigabyte
			bytes = parseFloat(Math.pow(10, 9));
			break;
		case 'TB': // Terabyte
			bytes = parseFloat(Math.pow(10, 12));
			break;
		case 'PB': // Petabyte
			bytes = parseFloat(Math.pow(10, 15));
			break;
		case 'EB': // Exabyte
			bytes = parseFloat(Math.pow(10, 18));
			break;
		case 'ZB': // Zettabyte
			bytes = parseFloat(Math.pow(10, 21));
			break;
		case 'YB': // Yottabyte
			bytes = parseFloat(Math.pow(10, 24));
			break;
		case 'BB': // Brontobyte
			bytes = parseFloat(Math.pow(10, 27));
			break;
		case 'GpB': // GeopByte
			bytes = parseFloat(Math.pow(10, 30));
			break;
		case 'KiB': // Kibibyte
			bytes = parseFloat(Math.pow(2, 10));
			break;
		case 'MiB': // Mebibyte
			bytes = parseFloat(Math.pow(2, 20));
			break;
		case 'GiB': // Gebibyte
			bytes = parseFloat(Math.pow(2, 30));
			break;
		case 'TiB': // Tebibyte
			bytes = parseFloat(Math.pow(2, 40));
			break;
		case 'PiB': // Pebibyte
			bytes = parseFloat(Math.pow(2, 50));
			break;
		case 'EiB': // Exbibyte
			bytes = parseFloat(Math.pow(2, 60));
			break;
		case 'ZiB': // Zebibyte
			bytes = parseFloat(Math.pow(2, 70));
			break;
		case 'YiB': // Yobibyte
			bytes = parseFloat(Math.pow(2, 80));
			break;
		default:
			console.log('default');
	}

	return bytes;
}

function _convert_capacity(source_value, source_unit, target_unit) {
	source_bytes = _get_bytes(source_unit);
	target_bytes = _get_bytes(target_unit);

	multiplier = parseFloat(source_bytes / target_bytes);

	target_value = _round_to(parseFloat(source_value * multiplier), 2);

	console.log("source: " + source_value + " " + source_unit + " - converted: " + target_value + " " + target_unit);
}

function _reset_total_capacity() {
	_reset_total_raw_capacity();
	_reset_total_usable_capacity();
}

// Total Raw Capacity
function _reset_total_raw_capacity() {
	_set_inner_text(TOTAL_CAPACITY["raw"]["binary"]["identifier"], TOTAL_CAPACITY["raw"]["binary"]["default value"] + " " + _get_unit_binary(_get_value(DRIVES["unit"]["identifier"])));
	_set_inner_text(TOTAL_CAPACITY["raw"]["decimal"]["identifier"], TOTAL_CAPACITY["raw"]["decimal"]["default value"] + " " + _get_unit_decimal(_get_value(DRIVES["unit"]["identifier"])));
}

function _update_raw_capacity() {
	_set_inner_text(TOTAL_CAPACITY["raw"]["binary"]["identifier"], _get_total_raw_capacity_binary() + " " + _get_unit_binary(_get_value(DRIVES["unit"]["identifier"])));
	_set_inner_text(TOTAL_CAPACITY["raw"]["decimal"]["identifier"], _get_total_raw_capacity_decimal() + " " + _get_unit_decimal(_get_value(DRIVES["unit"]["identifier"])));
}

function _get_total_raw_capacity_binary() {
	var multiplier = 1.0;

	switch (_get_value(DRIVES["unit"]["identifier"])) {
		case 'TB':
			multiplier = parseFloat(Math.pow(10, 12) / Math.pow(2, 40)); //1024^4
			break;
		case 'GB':
			multiplier = parseFloat(Math.pow(10, 9) / Math.pow(2, 30)); //1024^3
			break;
		case 'MB':
			multiplier = parseFloat(Math.pow(10, 6) / Math.pow(2, 20)); //1024^2
			break;
		case 'TiB':
		case 'GiB':
		case 'MiB':
			multiplier = 1;
			break;
		default:
			console.log('default');
	}

	return _round_to(parseFloat(_get_total_raw_capacity() * multiplier), 2);
}

function _get_total_raw_capacity_decimal() {
	var multiplier = 1.0;

	switch (_get_value(DRIVES["unit"]["identifier"])) {
		case 'TB':
		case 'GB':
		case 'MB':
			multiplier = 1.0;
			break;
		case 'TiB':
			multiplier = parseFloat(Math.pow(2, 40) / Math.pow(10, 12));
			break;
		case 'GiB':
			multiplier = parseFloat(Math.pow(2, 30) / Math.pow(10, 9));
			break;
		case 'MiB':
			multiplier = parseFloat(Math.pow(2, 20) / Math.pow(10, 6));
			break;
		default:
			console.log('default');
	}

	return _round_to(parseFloat(_get_total_raw_capacity() * multiplier), 2);
}

function _get_total_raw_capacity() {
	return parseFloat(_get_value(DRIVES["number"]["identifier"]) * _get_value(DRIVES["size"]["identifier"]));
}

// Total Usable Capacity
function _reset_total_usable_capacity() {
	_set_inner_text(TOTAL_CAPACITY["usable"]["binary"]["identifier"], TOTAL_CAPACITY["usable"]["binary"]["default value"] + " " + _get_unit_binary(_get_value(DRIVES["unit"]["identifier"])));
	_set_inner_text(TOTAL_CAPACITY["usable"]["decimal"]["identifier"], TOTAL_CAPACITY["usable"]["decimal"]["default value"] + " " + _get_unit_decimal(_get_value(DRIVES["unit"]["identifier"])));
	_reset_progress_bar_total_capacity();
}

function _update_usable_capacity(raid_option) {
	_reset_total_usable_capacity();
	_set_inner_text(TOTAL_CAPACITY["usable"]["binary"]["identifier"], _get_total_usable_capacity_binary(raid_option) + " " + _get_unit_binary(_get_value(DRIVES["unit"]["identifier"])));
	_set_inner_text(TOTAL_CAPACITY["usable"]["decimal"]["identifier"], _get_total_usable_capacity_decimal(raid_option) + " " + _get_unit_decimal(_get_value(DRIVES["unit"]["identifier"])));
	_update_progress_bar_total_capacity(_get_total_usable_capacity_binary(raid_option), _get_total_raw_capacity_decimal());
}

function _get_total_usable_capacity_binary(raid_option) {
	var multiplier = 1.0;

	switch (_get_value(DRIVES["unit"]["identifier"])) {
		case 'TB':
			multiplier = parseFloat(Math.pow(10, 12) / Math.pow(2, 40)); //1024^4
			break;
		case 'GB':
			multiplier = parseFloat(Math.pow(10, 9) / Math.pow(2, 30)); //1024^3
			break;
		case 'MB':
			multiplier = parseFloat(Math.pow(10, 6) / Math.pow(2, 20)); //1024^2
			break;
		case 'TiB':
		case 'GiB':
		case 'MiB':
			multiplier = 1;
			break;
		default:
			console.log('default');
	}

	return _round_to(parseFloat(_get_total_usable_capacity(raid_option) * multiplier), 2);
}

function _get_total_usable_capacity_decimal(raid_option) {
	var multiplier = 1.0;

	switch (_get_value(DRIVES["unit"]["identifier"])) {
		case 'TB':
		case 'GB':
		case 'MB':
			multiplier = 1.0;
			break;
		case 'TiB':
			multiplier = parseFloat(Math.pow(2, 40) / Math.pow(10, 12));
			break;
		case 'GiB':
			multiplier = parseFloat(Math.pow(2, 30) / Math.pow(10, 9));
			break;
		case 'MiB':
			multiplier = parseFloat(Math.pow(2, 20) / Math.pow(10, 6));
			break;
		default:
			console.log('default');
	}

	return _round_to(parseFloat(_get_total_usable_capacity(raid_option) * multiplier), 2);
}

function _get_total_usable_capacity(raid_option) {
	var total_usable_capacity = -1;
	if(raid_option == 0 && _get_value(DRIVES["number"]["identifier"]) >= 1) {
		total_usable_capacity = parseFloat(_get_value(DRIVES["number"]["identifier"]) * _get_value(DRIVES["size"]["identifier"]));
	}

	if(raid_option == 1 && _get_value(DRIVES["number"]["identifier"]) == 2) {
		total_usable_capacity = parseFloat(_get_value(DRIVES["size"]["identifier"]));
	}
	
	if(raid_option == 10 && _get_value(DRIVES["number"]["identifier"]) >= 4 && (_get_value(DRIVES["number"]["identifier"]) % 2) == 0 ) {
		total_usable_capacity = parseFloat((_get_value(DRIVES["size"]["identifier"]) * _get_value(DRIVES["number"]["identifier"])) / 2);
	}
	
	if(raid_option == 5 && _get_value(DRIVES["number"]["identifier"]) >= 3) {
		total_usable_capacity = parseFloat((_get_value(DRIVES["size"]["identifier"]) * _get_value(DRIVES["number"]["identifier"])) - _get_value(DRIVES["size"]["identifier"]));
	}
	
	if(raid_option == 6 && _get_value(DRIVES["number"]["identifier"]) >= 4) {
		total_usable_capacity = parseFloat((_get_value(DRIVES["size"]["identifier"]) * _get_value(DRIVES["number"]["identifier"])) - _get_value(DRIVES["size"]["identifier"]) * 2);
	}
	
	if(raid_option == 50 && _get_value(DRIVES["number"]["identifier"]) >= 6) {
		total_usable_capacity = parseFloat(((_get_value(DRIVES["size"]["identifier"]) * (_get_value(DRIVES["number"]["identifier"]) / 2)) - _get_value(DRIVES["size"]["identifier"])) * 2);
	}
	
	if(raid_option == 60 && _get_value(DRIVES["number"]["identifier"]) >= 8) {
		total_usable_capacity = parseFloat(((_get_value(DRIVES["size"]["identifier"]) * (_get_value(DRIVES["number"]["identifier"]) / 2)) - _get_value(DRIVES["size"]["identifier"]) * 2) * 2);
	}
	
	return parseFloat(total_usable_capacity);
}

// Progress Bar
function _reset_progress_bar_total_capacity() {
	_set_width(TOTAL_CAPACITY["usable"]["progress bar"]["identifier"], TOTAL_CAPACITY["usable"]["progress bar"]["default value"]);
}

function _update_progress_bar_total_capacity(total_usable_capacity_binary, total_raw_capacity_decimal) {
	total_usable_capacity_percent = _round_to(parseFloat((100 * total_usable_capacity_binary) / total_raw_capacity_decimal), 2);
	_set_width(TOTAL_CAPACITY["usable"]["progress bar"]["identifier"], total_usable_capacity_percent);
}