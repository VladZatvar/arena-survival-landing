const LOG_LEVELS = {
  DEBUG: 10,
  INFO: 20,
  WARN: 30,
  ERROR: 40
};

const DEFAULT_LOG_LEVEL = "INFO";
const LOG_STORAGE_KEY = "arena_survival_log_level";

function getCurrentLogLevel() {
  const savedLevel = localStorage.getItem(LOG_STORAGE_KEY);

  if (savedLevel && LOG_LEVELS[savedLevel]) {
    return savedLevel;
  }

  return DEFAULT_LOG_LEVEL;
}

function shouldLog(level) {
  return LOG_LEVELS[level] >= LOG_LEVELS[getCurrentLogLevel()];
}

function buildLogMessage(level, message, context = {}) {
  const timestamp = new Date().toISOString();
  const contextString =
    Object.keys(context).length > 0 ? ` | context=${JSON.stringify(context)}` : "";

  return `[${timestamp}] [${level}] ${message}${contextString}`;
}

function logDebug(message, context = {}) {
  if (shouldLog("DEBUG")) {
    console.debug(buildLogMessage("DEBUG", message, context));
  }
}

function logInfo(message, context = {}) {
  if (shouldLog("INFO")) {
    console.info(buildLogMessage("INFO", message, context));
  }
}

function logWarn(message, context = {}) {
  if (shouldLog("WARN")) {
    console.warn(buildLogMessage("WARN", message, context));
  }
}

function logError(message, context = {}) {
  if (shouldLog("ERROR")) {
    console.error(buildLogMessage("ERROR", message, context));
  }
}

function setLogLevel(level) {
  if (LOG_LEVELS[level]) {
    localStorage.setItem(LOG_STORAGE_KEY, level);
    logInfo("Рівень логування змінено", { newLevel: level });
  } else {
    logWarn("Спроба встановити невідомий рівень логування", { requestedLevel: level });
  }
}

window.appLogger = {
  logDebug,
  logInfo,
  logWarn,
  logError,
  setLogLevel,
  getCurrentLogLevel
};