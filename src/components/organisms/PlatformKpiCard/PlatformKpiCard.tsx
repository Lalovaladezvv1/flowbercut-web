import {
  Box,
  Typography,
  alpha,
} from '@mui/material';

import type {
  PlatformKpiCardProps,
} from './PlatformKpiCard.types';

export const PlatformKpiCard = ({
  title,
  value,
  description,
  icon,
  accent,
}: PlatformKpiCardProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minWidth: 0,
        height: '100%',
        minHeight: {
          xs: 145,
          sm: 156,
        },
        p: {
          xs: 1.75,
          sm: 2.25,
          md: 2.5,
        },
        boxSizing: 'border-box',
        overflow: 'hidden',
        borderRadius: 3,
        background:
          'linear-gradient(145deg, rgba(24,24,30,0.78), rgba(12,12,16,0.88))',
        border:
          '1px solid rgba(255,255,255,0.08)',
        boxShadow:
          '0 20px 60px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.035)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      {/* Accent glow */}
      <Box
        sx={{
          position: 'absolute',
          top: -60,
          right: -50,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: alpha(accent, 0.1),
          filter: 'blur(35px)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Typography
          sx={{
            minWidth: 0,
            color: alpha('#F5F5F7', 0.48),
            fontSize: {
              xs: '0.7rem',
              sm: '0.76rem',
            },
            fontWeight: 600,
            letterSpacing: '0.01em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            flexShrink: 0,
            width: {
              xs: 34,
              sm: 38,
            },
            height: {
              xs: 34,
              sm: 38,
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
            color: accent,
            backgroundColor:
              alpha(accent, 0.08),
            border:
              `1px solid ${alpha(accent, 0.15)}`,
          }}
        >
          {icon}
        </Box>
      </Box>

      {/* Value */}
      <Typography
        sx={{
          position: 'relative',
          zIndex: 1,
          mt: {
            xs: 2,
            sm: 2.5,
          },
          minWidth: 0,
          color: '#F5F5F7',
          fontSize: {
            xs: '1.6rem',
            sm: '1.8rem',
            md: '2rem',
          },
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          position: 'relative',
          zIndex: 1,
          mt: 1,
          minWidth: 0,
          color: alpha('#F5F5F7', 0.38),
          fontSize: {
            xs: '0.68rem',
            sm: '0.72rem',
          },
          lineHeight: 1.4,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};